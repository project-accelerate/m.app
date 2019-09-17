// import { subHours, format } from 'date-fns'
// import { ApolloClient } from 'apollo-client'
// import { Notifications } from 'expo'
// import {
//   AttendEventMutationVariables,
//   CancelEventAttendanceMutationVariables,
//   CalendarEventFragment,
// } from '../../../queries'
// import * as theme from '../../../theme'

// import AttendEvent from './AttendEvent.graphql'
// import {
//   ClientStorage,
//   createClientStorage,
// } from '../../common/ClientStorage/ClientStorage'

// /**
//  * FIXME: This is all a bit icky, but don't have time to do it properly before conference.
//  *
//  * We have 2 sources of truth for which events a user is attending:
//  * When a user mark that they're attending an event, we save it locally.
//  *
//  * We have to save it locally, because we don't want this to fail if the user has
//  * bad signal.
//  *
//  * We also tell the server that the user is attending, or if they cancel their attendance.
//  * There is no eventual consistency, so the two will end up drifting.
//  *
//  * This is fine, as we aren't really interested in which users are attending which events,
//  * just how many of them are. If we ever become interested in which users are attending
//  * (eg. if we start publicising it) then this will need fixing.
//  */

// export interface EventAttendanceState {
//   [eventId: string]:
//     | {
//         notificationToken: Notifications.LocalNotificationId
//         notification: Notifications.LocalNotification
//       }
//     | undefined
// }

// export function eventIsFavourited(
//   state: ClientStorage<EventAttendanceState>,
//   event: string | null,
// ) {
//   return Boolean(event && state.value[event])
// }

// export function setEventFavourited(
//   client: ApolloClient<{}>,
//   state: ClientStorage<EventAttendanceState>,
//   props: AttendEventProps,
// ) {
//   return (favourited: boolean) => {
//     if (favourited) {
//       attendEvent(client, state, props)
//     } else {
//       cancelEventAttendance(client, state, {
//         event: props.event.id,
//         user: props.userId,
//       })
//     }
//   }
// }

// export const EventAttendanceConsumer = createClientStorage<
//   EventAttendanceState
// >('events-attended', {})

// interface AttendEventProps {
//   event: CalendarEventFragment
//   userId: string
//   minutesBefore: number
// }

// export async function attendEvent(
//   client: ApolloClient<{}>,
//   state: ClientStorage<EventAttendanceState>,
//   props: AttendEventProps,
// ) {
//   const variables: AttendEventMutationVariables = {
//     event: props.event.id,
//     user: props.userId,
//   }

//   const notification: Notifications.LocalNotification = {
//     title: `Happening soon`,
//     data: props.event,
//     android: {
//       color: theme.pallete.accent,
//       vibrate: true,
//       sound: true,
//     },
//     ios: {
//       sound: true,
//     },
//     body: `${props.event.name} will be starting at ${
//       props.event.venue.name
//     } at ${format(props.event.startTime, 'h:mm')}`,
//   }

//   const notificationToken = await Notifications.scheduleLocalNotificationAsync(
//     notification,
//     {
//       time: subHours(props.event.startTime, props.minutesBefore),
//     },
//   )

//   state.setValue({
//     ...state.value,
//     [props.event.id]: { notificationToken, notification },
//   })

//   try {
//     await client.mutate({
//       mutation: AttendEvent,
//       variables,
//     })
//   } catch {}
// }

// export async function cancelEventAttendance(
//   client: ApolloClient<{}>,
//   state: ClientStorage<EventAttendanceState>,
//   variables: CancelEventAttendanceMutationVariables,
// ) {
//   const notificationState = state.value[variables.event]
//   if (notificationState) {
//     await Notifications.cancelScheduledNotificationAsync(
//       notificationState.notificationToken,
//     )
//   }

//   state.setValue({
//     ...state.value,
//     [variables.event]: undefined,
//   })

//   try {
//     await client.mutate({
//       mutation: AttendEvent,
//       variables,
//     })
//   } catch {}
// }
