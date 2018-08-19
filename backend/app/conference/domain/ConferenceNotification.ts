import { ObjectType, Field, registerEnumType } from 'type-graphql'
import { ConferenceNotificationScope } from 'common/domain/ConferenceNotificationScope'

@ObjectType()
export class ConferenceNotificationSendRequest {
  @Field() message!: string

  @Field() scope!: ConferenceNotificationScope
}

@ObjectType()
export class ConferenceNotification {
  @Field() id!: string

  @Field() message!: string

  @Field() timeSent!: Date

  @Field() scope!: ConferenceNotificationScope
}

registerEnumType(ConferenceNotificationScope, {
  name: 'ConferenceNotificationScope',
})
