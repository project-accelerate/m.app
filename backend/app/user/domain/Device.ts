import { ObjectType, Field, InputType } from 'type-graphql'

export enum DeviceType {
  IOS = 'iOS',
  ANDROID = 'Android',
}

@InputType()
export class RegisterDeviceRequest {
  @Field() deviceToken!: string

  @Field() deviceType!: DeviceType
}

@ObjectType()
export class Device {
  @Field() id!: string

  @Field() deviceToken!: string

  @Field() deviceType!: DeviceType

  owner!: string
}
