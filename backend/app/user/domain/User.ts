import { ObjectType, Field, Arg, InputType } from 'type-graphql'
import { NotificationType } from './NotificationType'

@InputType()
export class CreateUserRequest {
  @Field() optedIntoNotifications!: boolean
}

export interface UserProps {
  optedIntoNotifications: boolean
  email?: string
}

@ObjectType()
export class User implements UserProps {
  @Field() id!: string

  @Field({ nullable: true })
  email?: string

  @Field()
  acceptsNotificationType(
    @Arg('type', () => NotificationType)
    notificationType: NotificationType,
  ): boolean {
    return this.optedIntoNotifications
  }

  optedIntoNotifications!: boolean
}
