import { mock, instance, verify, when, anything, deepEqual } from 'ts-mockito'
import { ExpoPushMessage, ExpoPushReceipt } from 'expo-server-sdk'
import { MockCrudRepositoryFixture } from 'backend/app/common/test/MockCrudRepositoryFixture'
import { MockDateProviderFixture } from 'backend/app/common/test/MockDateProviderFixture'
import { ExpoPushClient } from '../../external/ExpoPushClient'
import { PendingNotificationRepository } from '../../external/PendingNotificationRepository'
import { MockDeviceAdminServiceFixture } from '../../test/MockDeviceAdminServiceFixture'
import { PushNotificationService } from '../PushNotificationService'
import {
  somePushNotification,
  someFailedPushNotificationReceipt,
  someSuccessfulPushNotificationReceipt,
} from '../../test/expoPushClientTestUtils'
import { somePendingNotification } from '../../test/pendingNotificationTestUtils'
import { someDate } from 'common/test/testUtils'

describe(PushNotificationService, () => {
  describe('sendNotifications', () => {
    const deviceId = 'my-device'
    const ticketId = 'my-ticket'

    it('should send notifications and save record of sending', async () => {
      const fixture = new Fixture()
      const notificationId = 'my-notification'
      const notification = somePushNotification()

      fixture.pendingNotificationRepository.givenIdReturnedFromInsert(
        notificationId,
      )

      fixture.givenTicketIdForSentNotifcation(ticketId)

      await fixture.service.sendNotifications([
        {
          deviceId,
          payload: notification,
        },
      ])

      fixture.verifyNotificationsSent({
        ...notification,
        priority: 'high',
      })
      fixture.pendingNotificationRepository.verifyInserted([
        {
          ticketId,
          deviceId,
          timeSent: fixture.dateProvider.date,
        },
      ])
    })
  })

  describe('checkNotificationReceipts', () => {
    const pendingNotification = somePendingNotification({
      deviceId: 'my-device',
      ticketId: 'my-ticket',
      timeSent: someDate(),
    })

    it('should unregister device and remove pending notification if notification failed due to device becoming inactive', async () => {
      const fixture = new Fixture()

      fixture.pendingNotificationRepository.givenObjectsReturnedFromFindAll([
        pendingNotification,
      ])

      fixture.givenANotificationReceipt(
        pendingNotification.ticketId,
        someFailedPushNotificationReceipt({
          details: { error: 'DeviceNotRegistered' },
        }),
      )

      await fixture.service.checkNotificationReceipts()

      fixture.deviceAdminService.verifyDevicesUnregisteredFromOwners([
        pendingNotification.deviceId,
      ])
    })

    it('should remove pending notification but not unregister device and if notification failed for some other reason', async () => {
      const fixture = new Fixture()

      fixture.pendingNotificationRepository.givenObjectsReturnedFromFindAll([
        pendingNotification,
      ])

      fixture.givenANotificationReceipt(
        pendingNotification.ticketId,
        someFailedPushNotificationReceipt({
          details: { error: 'InvalidCredentials' },
        }),
      )

      await fixture.service.checkNotificationReceipts()

      fixture.deviceAdminService.verifyDevicesNotUnregisteredFromOwners()
    })

    it('should remove pending notification but not unregister device if notification succeeds', async () => {
      const fixture = new Fixture()

      fixture.pendingNotificationRepository.givenObjectsReturnedFromFindAll([
        pendingNotification,
      ])

      fixture.givenANotificationReceipt(
        pendingNotification.ticketId,
        someSuccessfulPushNotificationReceipt(),
      )

      await fixture.service.checkNotificationReceipts()

      fixture.deviceAdminService.verifyDevicesNotUnregisteredFromOwners()
    })

    it('should do nothing if receipt not received yet', async () => {
      const fixture = new Fixture()

      fixture.pendingNotificationRepository.givenObjectsReturnedFromFindAll([
        pendingNotification,
      ])

      fixture.givenANotificationReceipt(
        pendingNotification.ticketId,
        someSuccessfulPushNotificationReceipt(),
      )

      await fixture.service.checkNotificationReceipts()

      fixture.deviceAdminService.verifyDevicesNotUnregisteredFromOwners()
    })
  })
})

class Fixture {
  expoClient = mock(ExpoPushClient)
  dateProvider = new MockDateProviderFixture()
  pendingNotificationRepository = new MockCrudRepositoryFixture(
    PendingNotificationRepository,
  )
  deviceAdminService = new MockDeviceAdminServiceFixture()

  service = new PushNotificationService(
    this.dateProvider.instance,
    instance(this.expoClient),
    this.pendingNotificationRepository.instance,
    this.deviceAdminService.instance,
  )

  constructor() {
    when(this.expoClient.requestNotificationReceipts(anything())).thenResolve(
      {},
    )
  }

  verifyNotificationsSent(message: ExpoPushMessage) {
    verify(this.expoClient.sendNotifications(deepEqual([message]))).called()
  }

  givenANotificationReceipt(ticketId: string, receipt: ExpoPushReceipt) {
    when(
      this.expoClient.requestNotificationReceipts(deepEqual([ticketId])),
    ).thenResolve({
      [ticketId]: receipt,
    })
  }

  givenTicketIdForSentNotifcation(id: string) {
    when(this.expoClient.sendNotifications(anything())).thenResolve([
      {
        id,
      },
    ])
  }
}
