import {
  NotificationHandler,
  InAppNotificationProps,
} from '../../common/Notification/NotificationHandler'
import { Routes } from '../../../routes'
import { EventDetailScreen } from '../Event/EventDetailScreen'
import { Notifications } from 'expo'

interface ConferenceNotification {
  id: string
  title: string
  body: string
}

export class NewsHandler extends NotificationHandler<ConferenceNotification> {
  static acceptsNotification(notification: Notifications.Notification) {
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
      routeName: Routes.get().findKeyFor(EventDetailScreen),
      routeParams: {
        id: this.data.id,
      },
    }
  }
}
