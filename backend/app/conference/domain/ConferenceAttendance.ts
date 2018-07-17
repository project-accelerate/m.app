import { ObjectType, Field, InputType } from 'type-graphql'
import { CreateUserRequest } from 'backend/app/user/domain/User'
import { RegisterDeviceRequest } from 'backend/app/user/domain/Device'
import { ConferenceId } from './Conference'

@InputType()
export class RegisterConferenceAttendanceRequest {
  @Field() user!: CreateUserRequest

  @Field() device!: RegisterDeviceRequest

  @Field(() => [ConferenceId])
  attendances!: ConferenceId[]
}

@ObjectType()
export class ConferenceAttendance {
  @Field() id!: string

  attendee!: string

  @Field(() => ConferenceId)
  conference!: ConferenceId
}
