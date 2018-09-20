import { mock, instance, when, anything, verify, deepEqual } from 'ts-mockito'
import { ConferenceNotificationService } from 'backend/app/conference/application/ConferenceNotificationService'
import { MockCrudRepositoryFixture } from 'backend/app/common/test/MockCrudRepositoryFixture'
import { ConferenceNotificationRepository } from 'backend/app/conference/external/ConferenceNotificationRepository'
import { PushNotificationService } from 'backend/app/device/application/PushNotificationService'
import { UserRepository } from 'backend/app/user/external/UserRepository'
import { DeviceRepository } from 'backend/app/device/external/DeviceRepository'
import { MockDateProviderFixture } from 'backend/app/common/test/MockDateProviderFixture'
import {
  ConferenceNotificationTargeter,
  NotificationMetadata,
} from 'backend/app/conference/application/ConferenceNotificationTargeter'
import { someUser } from 'backend/app/user/test/userTestUtils'
import { someDevice } from 'backend/app/device/test/deviceTestUtils'
import { NotificationTarget } from 'backend/app/conference/domain/NotificationTarget'
import { ConferenceNotificationScope } from 'common/domain/ConferenceNotificationScope'
import { PushNotificationRequest } from 'backend/app/device/domain/PushNotificationRequest'
import { Device } from 'backend/app/device/domain/Device'

describe(ConferenceNotificationService, () => {
  it('sends notifications to relevant devices and records the notifcation', async () => {
    const fixture = new Fixture()
    const metadata: NotificationMetadata = {
      type: 'conference-notification',
      associatedObject: '123',
    }
    const target: NotificationTarget = {
      device: { id: '123' },
    }
    const device = someDevice()
    const request = {
      associatedEventId: '123',
      title: 'hi',
      message: 'hello',
      scope: ConferenceNotificationScope.EVERYONE,
      urgent: false,
      detail: '',
    }

    fixture.givenNotificationTarget(target)
    fixture.givenSomeDevicesForTarget(target, [device])
    fixture.givenNotificationMetadata(metadata)
    fixture.conferenceNotificationRepository.givenIdReturnedFromInsert(
      'notification',
    )

    await fixture.service.handleSendNotificationsRequest(request)

    fixture.verifyNotificationsSent([
      {
        deviceId: device.id,
        payload: {
          to: device.deviceToken!,
          data: { id: 'notification', ...metadata },
          title: 'hi',
          body: 'hello',
          priority: 'normal',
          sound: null,
        },
      },
    ])

    fixture.conferenceNotificationRepository.verifyInserted({
      ...request,
      timeSent: fixture.dateProvider.date,
    })
  })
})

class Fixture {
  conferenceNotificationRepository = new MockCrudRepositoryFixture(
    ConferenceNotificationRepository,
  )
  pushNotificationService = mock(PushNotificationService)
  userRepository = new MockCrudRepositoryFixture(UserRepository)
  deviceRepository = new MockCrudRepositoryFixture(DeviceRepository)
  dateProvider = new MockDateProviderFixture()
  notificationTargeter = mock(ConferenceNotificationTargeter)

  service = new ConferenceNotificationService(
    this.conferenceNotificationRepository.instance,
    instance(this.pushNotificationService),
    this.userRepository.instance,
    this.deviceRepository.instance,
    this.dateProvider.instance,
    instance(this.notificationTargeter),
  )

  givenSomeDevicesForTarget(target: NotificationTarget, devices: Device[]) {
    const user = someUser()

    this.userRepository.givenObjectsReturnedFromFind([user], target.user)

    this.deviceRepository.givenObjectsReturnedFromFind(devices)
  }

  givenNotificationTarget(target: NotificationTarget) {
    when(
      this.notificationTargeter.getTargetsForNotification(anything()),
    ).thenReturn(target)
  }

  givenNotificationMetadata(metadata: NotificationMetadata) {
    when(
      this.notificationTargeter.getNotificationMetadata(anything()),
    ).thenReturn(metadata)
  }

  verifyNotificationsSent(notifications: PushNotificationRequest[]) {
    verify(
      this.pushNotificationService.sendNotifications(deepEqual(notifications)),
    ).called()
  }
}
