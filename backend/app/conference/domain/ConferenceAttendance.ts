import { ObjectType, Field, InputType, registerEnumType } from 'type-graphql'
import { CreateUserRequest, User } from 'backend/app/user/domain/User'
import { RegisterDeviceRequest, Device } from 'backend/app/device/domain/Device'
import { EventFamily } from 'common/domain/EventFamily'

@InputType()
export class RegisterConferenceAttendanceRequest {
  @Field() user!: CreateUserRequest

  @Field() device!: RegisterDeviceRequest
}

@ObjectType()
export class RegisterConferenceAttendanceResponse {
  @Field() device!: Device

  @Field() user!: User
}

registerEnumType(EventFamily, {
  name: 'EventFamily',
})
