import { ObjectType, Field, Arg, InputType } from 'type-graphql'
import { NotificationType } from './NotificationType'

@InputType()
export class CreateUserRequest {
  @Field() optedIntoNotifications!: boolean
  @Field() isDelegate!: boolean
  @Field({ nullable: true })
  email?: string
}

export interface UserProps {
  optedIntoNotifications: boolean
  isDelegate: boolean
  email?: string
  consentToContact: boolean
}

@ObjectType()
export class User implements UserProps {
  @Field() id!: string

  @Field() isDelegate!: boolean

  @Field() consentToContact!: boolean

  @Field({ nullable: true })
  email?: string

  optedIntoNotifications!: boolean
}
