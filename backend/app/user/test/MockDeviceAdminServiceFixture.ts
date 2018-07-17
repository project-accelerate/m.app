import { mock, instance, when, anything, verify, deepEqual } from 'ts-mockito'
import { DeviceAdminService } from 'backend/app/user/application/DeviceAdminService'
import { someDevice } from 'backend/app/user/test/userTestUtils'
import { RegisterDeviceRequest } from 'backend/app/user/domain/Device'

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
}
