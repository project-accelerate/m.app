import { ObjectType, Field, InputType } from 'type-graphql'
import { ConferenceId } from './Conference'
import { CreateUserRequest } from 'backend/app/user/domain/User'
import { RegisterDeviceRequest } from 'backend/app/user/domain/Device'

@InputType()
export class RegisterConferenceAttendanceRequest {
  @Field() user!: CreateUserRequest

  @Field() device!: RegisterDeviceRequest

  @Field(() => [ConferenceAttendance])
  attendances!: ConferenceAttendance[]
}

@ObjectType()
export class ConferenceAttendance {
  @Field() id!: string

  attendee!: string

  @Field() conference!: ConferenceId
}
