import { Resolver, Query, Authorized, Arg } from 'type-graphql'
import { createSimpleConnection } from 'backend/app/common/Connection'
import { ConferenceNotification } from 'backend/app/conference/domain/ConferenceNotification'
import { ConferenceNotificationRepository } from 'backend/app/conference/external/ConferenceNotificationRepository'
import { Role } from 'common/domain/Role'
import { ConferenceNotificationScope } from 'common/domain/ConferenceNotificationScope'
import { oneOf } from 'backend/app/common/CrudRepository'
import { ConferenceNotificationTargeter } from 'backend/app/conference/application/ConferenceNotificationTargeter'

const SentNotificationsConnection = createSimpleConnection({
  name: 'SentNotificationsConnection',
  type: ConferenceNotification,
})

@Resolver()
export class ConferenceNotificationResolver {
  constructor(
    private conferenceNotificationRepository: ConferenceNotificationRepository,
    private notificationTargeter: ConferenceNotificationTargeter,
  ) {}

  @Query(() => ConferenceNotification)
  async notification(@Arg('id') id: string) {
    return this.conferenceNotificationRepository.findOne({
      id,
    })
  }

  @Query(() => SentNotificationsConnection)
  async sentNotifications(
    @Arg('user', { nullable: true })
    user?: string,
  ) {
    return new SentNotificationsConnection(
      await this.conferenceNotificationRepository.find({
        scope: user
          ? oneOf(...(await this.notificationTargeter.getScopesForUser(user)))
          : undefined,
      }),
    )
  }
}
