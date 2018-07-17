import { Container } from 'typedi'
import { someUuid, someBool, someString } from 'common/test/testUtils'
import { WithoutId } from 'backend/app/common/WithoutId'
import { UserRepository } from '../external/UserRepository'
import { DeviceRepository } from '../external/DeviceRepository'
import { User, UserProps } from '../domain/User'
import { Device, DeviceType } from '../domain/Device'

type DeviceProps = WithoutId<Device>

export function someDeviceType(): DeviceType {
  return DeviceType.ANDROID
}

export function someOtherDeviceType(): DeviceType {
  return DeviceType.IOS
}

export function someUserProps(props: Partial<UserProps> = {}): UserProps {
  return {
    optedIntoNotifications: someBool(),
    email: someString(),
    ...props,
  }
}

export function someUser(props: Partial<User>): User {
  return Object.assign(new User(), { id: someUuid() }, props)
}

export async function givenThatAUserExists(
  props: Partial<UserProps> = {},
): Promise<User> {
  return Container.get(UserRepository).insert(someUserProps(props))
}

export function someDeviceProps(props: Partial<DeviceProps> = {}): DeviceProps {
  return {
    deviceToken: someString(),
    deviceType: someDeviceType(),
    owner: someUuid(),
    ...props,
  }
}

export function someDevice(props: Partial<Device>): Device {
  return Object.assign(new Device(), { id: someUuid() }, props)
}

export async function givenThatADeviceExists({
  owner,
  ...props
}: Partial<DeviceProps> = {}): Promise<Device> {
  return Container.get(DeviceRepository).insert(
    someDeviceProps({
      owner: owner || (await givenThatAUserExists()).id,
      ...props,
    }),
  )
}
