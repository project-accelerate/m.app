import { ExpoPushMessage, Expo, ExpoPushTicket, ExpoPushReceipt, ExpoPushReceiptId } from 'expo-server-sdk'
import { Service } from 'typedi';
import log from 'winston'

@Service()
export class ExpoPushClient {
  expo = new Expo()

  async sendNotifications(notifications: ExpoPushMessage[]) {
    const chunks = this.expo.chunkPushNotifications(notifications)
    const tickets: ExpoPushTicket[] = []

    if (chunks.length > 1) {
      log.warn(`Push notification batch exceeds a single chunk (chunks: ${chunks.length}, chunkSize: ${chunks[0].length})`)
    }

    for (let chunk of chunks) {
      try {
        let ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);

      } catch (error) {
        log.error(error);
      }
    }

    return tickets
  }

  async requestNotificationReceipts(receiptIds: ExpoPushReceiptId[]) {
    const chunks = this.expo.chunkPushNotificationReceiptIds(receiptIds);
    const receipts: Record<string, ExpoPushReceipt> = {}

    if (chunks.length > 1) {
      log.warn(`Push notification receipt batch exceeds a single chunk (chunks: ${chunks.length}, chunkSize: ${chunks[0].length})`)
    }

    for (let chunk of chunks) {
      try {
        const chunkReceipts = await this.expo.getPushNotificationReceiptsAsync(chunk);
        Object.assign(receipts, chunkReceipts)

      } catch (error) {
        log.error(error);
      }
    }

    return receipts
  }
}
