import { ObjectType, Field, InputType, registerEnumType } from 'type-graphql'
import { CreateUserRequest } from 'backend/app/user/domain/User'
import { RegisterDeviceRequest } from 'backend/app/user/domain/Device'
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

registerEnumType(EventFamily, {
  name: 'EventFamily',
})
