import {
  NotificationHandler,
  InAppNotificationProps,
} from '../../common/Notification/NotificationHandler'
import { Routes } from '../../../routes'
import { EventDetailScreen } from '../Event/EventDetailScreen'
import { Notifications } from 'expo'
import { NewsDetailScreen } from './NewsDetailScreen'

interface ConferenceNotification {
  id: string
  title: string
  body: string
}

export class NewsHandler extends NotificationHandler<ConferenceNotification> {
  static acceptNotification(notification: Notifications.Notification) {
    return notification.data.type === 'conference-notification'
  }

  getInAppNotificationProps(): InAppNotificationProps {
    return {
      title: this.data.title,
      message: this.data.body,
      okLabel: 'Read More...',
    }
  }

  getInitialRoute() {
    return {
      routeName: Routes.get().findKeyFor(NewsDetailScreen),
      routeParams: {
        id: this.data.id,
      },
    }
  }
}
