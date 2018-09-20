import { NotificationHandler } from '../../common/Notification/NotificationHandler'
import { Routes } from '../../../routes'
import { EventDetailScreen } from '../Event/EventDetailScreen'
import { Notifications } from 'expo'

interface ConferenceNotification {
  id: string
}

export class NewsHandler extends NotificationHandler<ConferenceNotification> {
  static acceptsNotification(notification: Notifications.Notification) {
    return notification.data.type === 'conference-notification'
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
