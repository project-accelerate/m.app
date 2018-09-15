import { Container } from 'typedi'
import { someUuid, someString } from 'common/test/testUtils'
import { WithoutId } from 'backend/app/common/WithoutId'
import { givenThatAUserExists } from 'backend/app/user/test/userTestUtils'
import { Device, DeviceType } from '../domain/Device'
import { DeviceRepository } from '../external/DeviceRepository'

type DeviceProps = WithoutId<Device>

export function someDeviceType(): DeviceType {
  return DeviceType.ANDROID
}

export function someOtherDeviceType(): DeviceType {
  return DeviceType.IOS
}

export function someDeviceProps(props: Partial<DeviceProps> = {}): DeviceProps {
  return {
    deviceToken: someString(),
    deviceType: someDeviceType(),
    owner: someUuid(),
    ...props,
  }
}

export function someDevice(props: Partial<Device> = {}): Device {
  return Object.assign(new Device(), someDeviceProps(), props)
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
