import { EventDispatcher } from 'backend/app/common/external/amqp/EventDispatcher'
import { Resolver, Mutation, Authorized } from 'type-graphql'
import { ConferenceNotificationSendRequest } from 'backend/app/conference/domain/ConferenceNotification'
import { MutationRequest } from 'backend/app/common/resolverUtils'
import { Role } from 'common/domain/Role'
import { GraphQLBoolean } from 'graphql'
import { ConferenceNotificationService } from 'backend/app/conference/application/ConferenceNotificationService'

@Resolver()
export class ConferenceNotificationMutations {
  constructor(private eventDispatcher: EventDispatcher) {}

  @Authorized([Role.ADMIN])
  @Mutation(() => GraphQLBoolean)
  async sendConferenceNotification(
    @MutationRequest(() => ConferenceNotificationSendRequest)
    request: ConferenceNotificationSendRequest,
  ) {
    this.eventDispatcher.dispatch(request)
    return true
  }
}
