import { Service } from 'typedi'
import { ConferenceNotificationSendRequest } from 'backend/app/conference/domain/ConferenceNotification'
import { NotificationTarget } from 'backend/app/conference/domain/NotificationTarget'
import { ConferenceNotificationScope } from 'common/domain/ConferenceNotificationScope'
import { never } from 'common/util'
import { User } from 'backend/app/user/domain/User'
import { UserRepository } from 'backend/app/user/external/UserRepository'
import { isEqual } from 'lodash'

export interface NotificationMetadata {
  type: 'conference-notification'
  associatedObject?: string
  associatedObjectType?: 'event' | 'link'
}

@Service()
export class ConferenceNotificationTargeter {
  constructor(private userRepository: UserRepository) {}

  getTargetsForNotification(notification: {
    scope: ConferenceNotificationScope
  }): NotificationTarget {
    if (notification.scope === ConferenceNotificationScope.EVERYONE) {
      return {}
    }

    if (notification.scope === ConferenceNotificationScope.DELEGATES) {
      return {
        user: {
          isDelegate: true,
        },
      }
    }

    return never(notification.scope)
  }

  async getScopesForUser(
    userId: string,
  ): Promise<ConferenceNotificationScope[]> {
    const user = await this.userRepository.findOneRequired({ id: userId })

    return Object.values(ConferenceNotificationScope).filter(scope =>
      this.shouldShowToUser(scope, user),
    )
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

  private shouldShowToUser(scope: ConferenceNotificationScope, user: User) {
    const { user: userTarget } = this.getTargetsForNotification({ scope })
    if (!userTarget) {
      return true
    }

    const keys = Object.keys(userTarget) as Array<keyof User>
    return keys.every(key => isEqual(userTarget[key], user[key]))
  }
}
