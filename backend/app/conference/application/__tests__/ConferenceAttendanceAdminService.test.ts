import { EventFamily } from 'common/domain/EventFamily'
import { DeviceType } from 'backend/app/device/domain/Device'
import { MockCrudRepositoryFixture } from 'backend/app/common/test/MockCrudRepositoryFixture'
import { MockUserAdminServiceFixture } from 'backend/app/user/test/MockUserAdminServiceFixture'
import { MockDeviceAdminServiceFixture } from 'backend/app/device/test/MockDeviceAdminServiceFixture'
import { ConferenceAttendanceRepository } from '../../external/ConferenceAttendanceRepository'
import { ConferenceAttendanceAdminService } from '../ConferenceAttendanceAdminService'

describe(ConferenceAttendanceAdminService, () => {
  it('registers user attending conferences and stores device', async () => {
    const fixture = new Fixture()

    fixture.deviceAdminService.givenThatDeviceRegistersWithId('my-device-id')
    fixture.userAdminService.givenThatUserRegistersWithId('my-user-id')

    await fixture.service.registerConferenceAttendances({
      attendances: [EventFamily.LABOUR_2018],
      device: {
        deviceType: DeviceType.ANDROID,
        deviceToken: 'my-device-token',
      },
      user: {
        optedIntoNotifications: true,
      },
    })

    fixture.conferenceAttendance.verifyInserted({
      attendee: 'my-user-id',
      conference: EventFamily.LABOUR_2018,
    })

    fixture.deviceAdminService.verifyDeviceRegisteredToOwner({
      device: {
        deviceToken: 'my-device-token',
        deviceType: DeviceType.ANDROID,
      },
      owner: 'my-user-id',
    })

    fixture.userAdminService.verifyUserCreated({
      optedIntoNotifications: true,
    })
  })
})

class Fixture {
  conferenceAttendance = new MockCrudRepositoryFixture(
    ConferenceAttendanceRepository,
  )
  userAdminService = new MockUserAdminServiceFixture()
  deviceAdminService = new MockDeviceAdminServiceFixture()

  service = new ConferenceAttendanceAdminService(
    this.conferenceAttendance.instance,
    this.deviceAdminService.instance,
    this.userAdminService.instance,
  )
}
