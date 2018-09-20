import { Notifications } from 'expo'
import {
  NotificationHandler,
  InAppNotificationProps,
} from '../../common/Notification/NotificationHandler'
import { calendar } from './calendarState'
import { theme } from '../../../theme'
import { format } from 'date-fns'
import { Routes } from '../../../routes'
import { EventDetailScreenParams } from '../Event/EventDetailScreen'

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

  getInAppNotificationProps(): InAppNotificationProps {
    const event = this.data
    return {
      title: 'Happening Soon',
      message: `${event.name} will be starting at ${
        event.venueName
      } at ${format(event.startTime, 'h:mm')}`,
      okLabel: 'View Event',
    }
  }

  routeName = Routes.get().getRoutename('EventDetailScreen')
  routeParams: EventDetailScreenParams = {
    id: this.data.id,
    title: this.data.name,
    image: this.data.imageUrl,
  }

  getInitialRoute() {
    return {
      routeName: this.routeName,
      routeParams: this.routeParams,
    }
  }
}
