import { Service } from 'typedi'
import { keyBy } from 'lodash'
import { Memoize } from 'lodash-decorators'
import { ExpoPushReceipt } from 'expo-server-sdk'
import { ScheduledTask, TaskType } from 'backend/util/ScheduledTask'
import { oneOf } from 'backend/app/common/CrudRepository'
import { DateProvider } from 'backend/app/common/DateProvider'
import { ExpoPushClient } from '../external/ExpoPushClient'
import { PendingNotificationRepository } from '../external/PendingNotificationRepository'
import { PushNotificationRequest } from '../domain/PushNotificationRequest'
import { DeviceAdminService } from './DeviceAdminService'
import { PendingNotification } from '../domain/PendingNotification'

@Service()
export class PushNotificationService {
  constructor(
    private dateProvider: DateProvider,
    private expoClient: ExpoPushClient,
    private pendingNotificationRepository: PendingNotificationRepository,
    private deviceAdminService: DeviceAdminService,
  ) {}

  async sendNotifications(requests: PushNotificationRequest[]) {
    const messages = requests.map(req => req.payload)
    const tickets = await this.expoClient.sendNotifications(messages)

    await this.pendingNotificationRepository.bulkInsert(
      tickets.map((receipt, i) => ({
        timeSent: this.dateProvider.now(),
        ticketId: receipt.id,
        deviceId: requests[i].deviceId,
      })),
    )
  }

  @ScheduledTask(TaskType.HOURLY)
  async checkNotificationReceipts() {
    const deliveryReceipts = await this.getNotificationReceipts()

    if (deliveryReceipts.unregisteredDeviceIds.length > 0) {
      this.deviceAdminService.unregisterDevicesFromOwners(
        deliveryReceipts.unregisteredDeviceIds,
      )
    }

    this.pendingNotificationRepository.delete({
      id: oneOf(...deliveryReceipts.completedNotificationIds),
    })
  }

  private async getNotificationReceipts() {
    const pendingNotifications = await this.pendingNotificationRepository.findAll()
    const ticketIds = pendingNotifications.map(
      notification => notification.ticketId,
    )

    const receipts = await this.expoClient.requestNotificationReceipts(
      ticketIds,
    )

    return new NotificationDeliveryReceipts(pendingNotifications, receipts)
  }
}

class NotificationDeliveryReceipts {
  private pendingNotificationsByTicketId: Record<string, PendingNotification>

  constructor(
    notifications: PendingNotification[],
    private receipts: Record<string, ExpoPushReceipt>,
  ) {
    this.pendingNotificationsByTicketId = keyBy(notifications, n => n.ticketId)
  }

  get completedNotificationIds() {
    return this.receivedTicketIds.map(
      ticketId => this.pendingNotificationsByTicketId[ticketId].id,
    )
  }

  get receivedTicketIds() {
    return Object.keys(this.receipts)
  }

  get unregisteredDeviceIds() {
    return this.receivedTicketIds
      .filter(ticketId =>
        this.receiptIndicatesUnregisteredDevice(this.getPushRecipt(ticketId)),
      )
      .map(ticketId => this.getDeviceIdForTicket(ticketId))
  }

  private getPushRecipt(ticketId: string) {
    return this.receipts[ticketId]
  }

  private getDeviceIdForTicket(ticketId: string) {
    return this.pendingNotificationsByTicketId[ticketId].deviceId
  }

  private receiptIndicatesUnregisteredDevice(receipt: ExpoPushReceipt) {
    return (
      receipt.status === 'error' &&
      receipt.details &&
      receipt.details.error === 'DeviceNotRegistered'
    )
  }
}
