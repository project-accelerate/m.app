import { ObjectType, Field, InputType, registerEnumType } from 'type-graphql'
import { CreateUserRequest, User } from 'backend/app/user/domain/User'
import { RegisterDeviceRequest, Device } from 'backend/app/device/domain/Device'
import { EventFamily } from 'common/domain/EventFamily'

@InputType()
export class RegisterConferenceAttendanceRequest {
  @Field() user!: CreateUserRequest

  @Field() device!: RegisterDeviceRequest

  @Field(() => [EventFamily])
  attendances!: EventFamily[]
}

@ObjectType()
export class ConferenceAttendance {
  @Field() id!: string

  attendee!: string

  @Field(() => EventFamily)
  conference!: EventFamily
}

@ObjectType()
export class RegisterConferenceAttendanceResponse {
  @Field() device!: Device

  @Field() user!: User

  @Field(() => [ConferenceAttendance])
  attendances!: ConferenceAttendance[]
}

registerEnumType(EventFamily, {
  name: 'EventFamily',
})
