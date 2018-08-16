import { Notifications } from 'expo'
import { NotificationHandler } from '../../common/Notification/NotificationHandler'
import { calendar } from './calendarState'
import { theme } from '../../../theme'
import { format } from 'date-fns'
import { Routes } from '../../../routes'

export function createEventReminderNotification(
  event: calendar.SavedEventDetails,
): Notifications.LocalNotification {
  return {
    title: `Happening soon`,
    data: {
      type: 'event-reminder',
      ...event,
    },
    android: {
      color: theme.pallete.accent,
      vibrate: true,
      sound: true,
    },
    ios: {
      sound: true,
    },
    body: `${event.name} will be starting at ${event.venueName} at ${format(
      event.startTime,
      'h:mm',
    )}`,
  }
}

export class EventReminderNotificationHandler extends NotificationHandler<
  calendar.SavedEventDetails
> {
  static acceptNotification(notification: Notifications.Notification) {
    return notification.data.type === 'event-reminder'
  }

  routeName = Routes.get().getRoutename('EventDetailScreen')
  routeParams = { id: this.data.id, title: this.data.name }

  getInitialRoute() {
    return {
      routeName: this.routeName,
      routeParams: this.routeParams,
    }
  }
}
