import { ObjectType, Field, InputType, registerEnumType } from 'type-graphql'

export enum DeviceType {
  IOS = 'IOS',
  ANDROID = 'ANDROID',
}

registerEnumType(DeviceType, {
  name: 'DeviceType',
})

@InputType()
export class RegisterDeviceRequest {
  @Field({ nullable: true })
  deviceToken?: string

  @Field(() => DeviceType, { nullable: true })
  deviceType?: DeviceType
}

@ObjectType()
export class Device {
  @Field() id!: string

  @Field({ nullable: true })
  deviceToken?: string

  @Field(() => DeviceType, { nullable: true })
  deviceType?: DeviceType

  owner!: string
}
