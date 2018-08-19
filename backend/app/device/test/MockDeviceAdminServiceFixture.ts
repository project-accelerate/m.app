import { mock, instance, when, anything, verify, deepEqual, objectContaining } from 'ts-mockito'
import { DeviceAdminService } from '../application/DeviceAdminService'
import { RegisterDeviceRequest } from '../domain/Device'
import { someDevice } from './deviceTestUtils'

export class MockDeviceAdminServiceFixture {
  mock = mock(DeviceAdminService)
  instance = instance(this.mock)

  givenThatDeviceRegistersWithId(id: string) {
    when(this.mock.registerDeviceToOwner(anything())).thenResolve(
      someDevice({ id }),
    )
  }

  verifyDeviceRegisteredToOwner(props: {
    device: RegisterDeviceRequest
    owner: string
  }) {
    verify(this.mock.registerDeviceToOwner(deepEqual(props))).called()
  }

  verifyDevicesUnregisteredFromOwners(devices: string[]) {
    verify(
      this.mock.unregisterDevicesFromOwners(deepEqual(devices))
    ).called()
  }

  verifyDevicesNotUnregisteredFromOwners() {
    verify(this.mock.unregisterDevicesFromOwners(anything())).never()
  }
}
