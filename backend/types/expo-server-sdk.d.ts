declare module 'expo-server-sdk' {
  export type ExpoClientOptions = {
    httpAgent?: Agent
    maxConcurrentRequests?: number
  }

  export type ExpoPushToken = string

  export type ExpoPushMessage = {
    to: ExpoPushToken
    data?: Object
    title?: string
    body?: string
    sound?: 'default' | null
    ttl?: number
    expiration?: number
    priority?: 'default' | 'normal' | 'high'
    badge?: number
  }

  export type ExpoPushReceiptId = string

  export type ExpoPushTicket = {
    id: ExpoPushReceiptId
  }

  type ExpoPushSuccessReceipt = {
    status: 'ok'
    details?: Object
    // Internal field used only by developers working on Expo
    __debug?: any
  }

  type ExpoPushErrorReceipt = {
    status: 'error'
    message: 'string'
    details?: {
      error?:
        | 'DeviceNotRegistered'
        | 'InvalidCredentials'
        | 'MessageTooBig'
        | 'MessageRateExceeded'
    }
    // Internal field used only by developers working on Expo
    __debug?: any
  }

  export type ExpoPushReceipt = ExpoPushSuccessReceipt | ExpoPushErrorReceipt

  export class Expo {
    getPushNotificationReceiptsAsync(
      receiptIds: ExpoPushReceiptId[],
    ): Promise<{ [id: string]: ExpoPushReceipt }>

    sendPushNotificationsAsync(
      messages: ExpoPushMessage[],
    ): Promise<ExpoPushTicket[]>
    chunkPushNotifications(messages: ExpoPushMessage[]): ExpoPushMessage[][]
    chunkPushNotificationReceiptIds(
      receiptIds: ExpoPushReceiptId[],
    ): ExpoPushReceiptId[][]
  }
}
