import { omit, sortBy, compact, take } from 'lodash'
import { Dispatch } from 'redux'
import {
  subHours,
  addSeconds,
  getHours,
  getDate,
  subMinutes,
  isBefore,
} from 'date-fns'
import { Notifications } from 'expo'
import { theme } from '../../../theme'
import {
  CalendarEventFragment,
  AttendEventMutationVariables,
  CancelEventAttendanceMutationVariables,
  FetchNewVotesQueryVariables,
  FetchNewVotesQuery,
} from '../../../queries'
import {
  ReducerAction,
  AppState,
  GetStateFn,
  AppDispatch,
} from '../../../state'
import { graphQlClient } from '../../../config/graphql'
import AttendEvent from './AttendEvent.graphql'
import FetchNewVotes from './FetchNewVotes.graphql'
import CancelEventAttendance from './CancelEventAttendance.graphql'
import { isEqual } from 'lodash'
import { createLogger } from '../../common/logger'
import { createEventReminderNotification } from './EventReminderNotification'
import { registration } from '../Registration/registrationState'

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
  const alertMinutesBefore = 30

  // HACK: Hardcoodeed yeah
  export const days = [
    new Date('2018-09-22'),
    new Date('2018-09-23'),
    new Date('2018-09-24'),
    new Date('2018-09-25'),
  ]

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
    imageUrl?: string
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

    upcomingEvents: (state: AppState, props: { now: Date }) => {
      const events = compact(Object.values(selectors.allEvents(state))).filter(
        e => isBefore(props.now, e.details.endTime),
      )

      return take(
        sortBy(events, (e: SavedEvent) => e.details.startTime),
        3,
      ).map(e => e.details)
    },

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
    recordAttendance?: boolean
  }

  interface RemoveSavedEventProps {
    eventId: string
    userId: string
  }

  export const actions = {
    fetchVotes: () => async (
      dispatch: AppDispatch<Action>,
      getState: () => AppState,
    ) => {
      log('Fetch votes')

      const userId = registration.selectors.userId(getState())
      const {
        user: { votes },
      } = await fetchNewVotes({
        userId,
      })

      votes.edges.forEach(({ node: vote }) => {
        dispatch(
          actions.saveEvent({
            alertMinutesBefore,
            event: vote,
            recordAttendance: false,
            userId,
          }),
        )
      })
    },

    saveEvent: ({
      event,
      userId,
      alertMinutesBefore,
      recordAttendance = true,
    }: SaveEventProps) => async (
      dispatch: Dispatch<Action>,
      getState: () => AppState,
    ) => {
      const details = {
        id: event.id,
        name: event.name,
        venueName: event.venue.name,
        startTime: event.startTime,
        endTime: event.endTime,
        imageUrl: (event.photo && event.photo.sourceUrl) || undefined,
      }

      const selectProps = { eventId: details.id }

      let prevSavedEvent =
        (selectors.isSaved(getState(), selectProps) &&
          selectors.savedEvent(getState(), selectProps)) ||
        undefined

      if (prevSavedEvent && isEqual(details, prevSavedEvent.details)) {
        return
      }

      if (prevSavedEvent) {
        log('Updating scheduled event', details)
        await Notifications.cancelScheduledNotificationAsync(
          prevSavedEvent.notificationToken,
        )
      } else {
        log('Adding new saved event', details)
      }

      const notificationTime = subHours(event.startTime, alertMinutesBefore)

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

      if (recordAttendance) {
        await submitEventAdded({
          event: event.id,
          user: userId,
        })
      }
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

  async function fetchNewVotes(variables: FetchNewVotesQueryVariables) {
    const result = await graphQlClient.query<FetchNewVotesQuery>({
      fetchPolicy: 'network-only',
      query: FetchNewVotes,
      variables,
    })

    return result.data
  }

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

  export function canSave(event: { startTime: string }, currentTime: Date) {
    const alertTime = subMinutes(event.startTime, alertMinutesBefore + 1)
    return alertTime > currentTime
  }
}
