import { Service } from 'typedi'
import { ConferenceNotificationSendRequest } from 'backend/app/conference/domain/ConferenceNotification'
import { NotificationTarget } from 'backend/app/conference/domain/NotificationTarget'
import { ConferenceNotificationScope } from 'common/domain/ConferenceNotificationScope'
import { never } from 'common/util'

export interface NotificationMetadata {
  type: 'conference-notification'
  associatedObject?: string
  associatedObjectType?: 'event' | 'link'
}

@Service()
export class ConferenceNotificationTargeter {
  getTargetsForNotification(
    notification: ConferenceNotificationSendRequest,
  ): NotificationTarget {
    if (notification.scope === ConferenceNotificationScope.EVERYONE) {
      return {}
    }

    return never(notification.scope)
  }

  getNotificationMetadata(
    notification: ConferenceNotificationSendRequest,
  ): NotificationMetadata {
    if (notification.associatedEventId) {
      return {
        type: 'conference-notification',
        associatedObject: notification.associatedEventId,
        associatedObjectType: 'event',
      }
    }

    if (notification.link) {
      return {
        type: 'conference-notification',
        associatedObject: notification.link,
        associatedObjectType: 'link',
      }
    }

    return {
      type: 'conference-notification',
    }
  }
}
