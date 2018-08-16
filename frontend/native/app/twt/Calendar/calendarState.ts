import { omit, sortBy, compact } from 'lodash'
import { Dispatch } from 'redux'
import { format, subHours, addSeconds, getHours, getDate } from 'date-fns'
import { Notifications } from 'expo'
import { theme } from '../../../theme'
import {
  CalendarEventFragment,
  AttendEventMutationVariables,
  CancelEventAttendanceMutationVariables,
} from '../../../queries'
import {
  ReducerAction,
  AppState,
  GetStateFn,
  AppDispatch,
} from '../../../state'
import { graphQlClient } from '../../../config/graphql'
import AttendEvent from './AttendEvent.graphql'
import CancelEventAttendance from './CancelEventAttendance.graphql'
import { createLogger } from '../../common/logger'
import { createEventReminderNotification } from './EventReminderNotification'

/**
 * IMPORTANT!
 *
 * We currently have 2 potential sources of truth for which events a user is
 * attending:
 *
 *  * When a user mark that they're attending an event, we save it locally.
 *
 *    We have to save it locally, because we don't want this to fail if the
 *    user has a bad signal, leaving the user with no way to cance.
 *
 *  * We also tell the server that the user is attending, or if they cancel
 *    their attendance.
 *
 * There is no attempt to sync these, so the two will end up drifting.
 *
 * This is fine, as we aren't really interested in which users are attending
 * which events, just how many of them are. If we ever become interested in
 * which users are attending (eg. if we start publicising it) then this will
 * need fixing.
 */

export namespace calendar {
  export const startHourOfDay = 4

  interface State {
    [eventId: string]: SavedEvent | undefined
  }

  interface SavedEvent {
    notificationToken: Notifications.LocalNotificationId
    details: SavedEventDetails
  }

  export interface SavedEventDetails {
    id: string
    name: string
    venueName: string
    startTime: string
    endTime: string
  }

  type Action =
    | {
        type: 'Calendar.addEvent'
        event: SavedEventDetails
        notificationToken: Notifications.LocalNotificationId
      }
    | { type: 'Calendar.removeEvent'; id: string }

  export const selectors = {
    allEvents: (state: AppState) => state.calendarEvents || {},

    eventsInDay: (state: AppState, props: { day: Date }) => {
      const eventList = compact(Object.values(selectors.allEvents(state)))
        .filter(x => isSameCalendarDay(x.details.startTime, props.day))
        .map(x => x.details)

      return sortBy(eventList, x => x.startTime)
    },

    isSaved: (state: AppState, props: { eventId: string }) => {
      const allEvents = selectors.allEvents(state)
      return Boolean(allEvents[props.eventId])
    },

    savedEvent: (state: AppState, props: { eventId: string }) => {
      const allEvents = selectors.allEvents(state)
      const event = allEvents[props.eventId]

      if (!event) {
        throw Error(`Saved event not found: ${props.eventId}`)
      }

      return event
    },

    anyEvent: (state: AppState) => {
      const allEvents = selectors.allEvents(state)
      const [id] = Object.keys(allEvents)

      return allEvents[id] && allEvents[id]!.details
    },
  }

  interface SaveEventProps {
    event: CalendarEventFragment
    alertMinutesBefore: number
    userId: string
  }

  interface RemoveSavedEventProps {
    eventId: string
    userId: string
  }

  export const actions = {
    saveEvent: (props: SaveEventProps) => async (
      dispatch: Dispatch<Action>,
    ) => {
      log('Request save notification')

      const details = {
        id: props.event.id,
        name: props.event.name,
        venueName: props.event.venue.name,
        startTime: props.event.startTime,
        endTime: props.event.endTime,
      }

      const notificationTime = subHours(
        props.event.startTime,
        props.alertMinutesBefore,
      )

      const notificationToken = await Notifications.scheduleLocalNotificationAsync(
        createEventReminderNotification(details),
        {
          time: notificationTime,
        },
      )

      dispatch({
        type: 'Calendar.addEvent',
        event: details,
        notificationToken,
      })

      await submitEventAdded({
        event: props.event.id,
        user: props.userId,
      })
    },

    removeSavedEvent: (props: RemoveSavedEventProps) => async (
      dispatch: Dispatch<Action>,
      getState: GetStateFn,
    ) => {
      log('Request remove notification')

      const event = selectors.savedEvent(getState(), props)

      await Notifications.cancelScheduledNotificationAsync(
        event.notificationToken,
      )

      dispatch({
        type: 'Calendar.removeEvent',
        id: props.eventId,
      })

      await submitEventRemoved({
        user: props.userId,
        event: props.eventId,
      })
    },

    toggleEventSaved: (props: SaveEventProps) => (
      dispatch: AppDispatch,
      getState: GetStateFn,
    ) => {
      const {
        userId,
        event: { id: eventId },
      } = props

      if (selectors.isSaved(getState(), { eventId })) {
        dispatch(actions.removeSavedEvent({ eventId, userId }))
      } else {
        dispatch(actions.saveEvent(props))
      }
    },

    showTestEventNotification: () => async (_: never, getState: GetStateFn) => {
      const event = selectors.anyEvent(getState())
      if (!event) {
        log('None currently scheduled')
        return
      }

      await Notifications.scheduleLocalNotificationAsync(
        createEventReminderNotification(event),
        { time: addSeconds(new Date(), 10) },
      )
    },
  }

  export const reducers = {
    calendarEvents: (
      prev: State = {},
      action: ReducerAction<Action>,
    ): State => {
      if (action.type === 'Calendar.addEvent') {
        return {
          ...prev,
          [action.event.id]: {
            details: action.event,
            notificationToken: action.notificationToken,
          },
        }
      }

      if (action.type === 'Calendar.removeEvent') {
        return omit(prev, action.id)
      }

      return prev
    },
  }

  const log = createLogger('Calendar')

  async function submitEventAdded(variables: AttendEventMutationVariables) {
    try {
      await graphQlClient.mutate({
        mutation: AttendEvent,
        variables,
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function submitEventRemoved(
    variables: CancelEventAttendanceMutationVariables,
  ) {
    try {
      await graphQlClient.mutate({
        mutation: CancelEventAttendance,
        variables,
      })
    } catch (error) {
      console.error(error)
    }
  }

  function isSameCalendarDay(lhs: Date | string, rhs: Date | string) {
    if (getHours(lhs) < startHourOfDay && getHours(rhs) >= startHourOfDay) {
      return getDate(rhs) === getDate(lhs) - 1
    }

    return getDate(lhs) === getDate(rhs)
  }
}
