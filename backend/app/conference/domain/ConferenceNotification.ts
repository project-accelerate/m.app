import { ObjectType, Field, registerEnumType, InputType } from 'type-graphql'
import { ConferenceNotificationScope } from 'common/domain/ConferenceNotificationScope'

@InputType()
export class ConferenceNotificationSendRequest {
  @Field() title!: string

  @Field() message!: string

  @Field() detail!: string

  @Field() urgent!: boolean

  @Field({ nullable: true })
  link?: string

  @Field({ nullable: true })
  associatedEventId?: string

  @Field(() => ConferenceNotificationScope)
  scope!: ConferenceNotificationScope
}

@ObjectType()
export class ConferenceNotification {
  @Field() id!: string

  @Field() timeSent!: Date

  @Field() title!: string

  @Field() message!: string

  @Field({ nullable: true })
  detail!: string

  @Field() urgent!: boolean

  @Field({ nullable: true })
  link?: string

  @Field({ nullable: true })
  associatedEventId?: string

  @Field(() => ConferenceNotificationScope)
  scope!: ConferenceNotificationScope
}

registerEnumType(ConferenceNotificationScope, {
  name: 'ConferenceNotificationScope',
})
