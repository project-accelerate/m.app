import { Resolver, Query, Authorized } from 'type-graphql'
import { createSimpleConnection } from 'backend/app/common/Connection'
import { ConferenceNotification } from 'backend/app/conference/domain/ConferenceNotification'
import { ConferenceNotificationRepository } from 'backend/app/conference/external/ConferenceNotificationRepository'
import { Role } from 'common/domain/Role'

const SentNotificationsConnection = createSimpleConnection({
  name: 'SentNotificationsConnection',
  type: ConferenceNotification,
})

@Resolver()
export class ConferenceNotificationResolver {
  constructor(
    private conferenceNotificationRepository: ConferenceNotificationRepository,
  ) {}

  @Authorized([Role.ADMIN])
  @Query(() => SentNotificationsConnection)
  async sentNotifications() {
    return new SentNotificationsConnection(
      await this.conferenceNotificationRepository.findAll(),
    )
  }
}
