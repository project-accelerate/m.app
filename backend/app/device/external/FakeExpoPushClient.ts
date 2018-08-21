import {
  ExpoPushMessage,
  Expo,
  ExpoPushTicket,
  ExpoPushReceipt,
  ExpoPushReceiptId,
} from 'expo-server-sdk'
import { Service } from 'typedi'
import log from 'winston'
import { someUuid } from 'common/test/testUtils'
import { someSuccessfulPushNotificationReceipt } from 'backend/app/device/test/expoPushClientTestUtils'

@Service()
export class FakeExpoPushClient {
  expo = new Expo()

  async sendNotifications(
    notifications: ExpoPushMessage[],
  ): Promise<ExpoPushTicket[]> {
    log.info(`[FakeExpoPushClient] sendNotifications`, notifications)
    return notifications.map(() => ({ id: someUuid() }))
  }

  async requestNotificationReceipts(receiptIds: ExpoPushReceiptId[]) {
    return receiptIds.map(() => someSuccessfulPushNotificationReceipt())
  }
}
