import { Service } from 'typedi'
import log from 'winston'
import { ConferenceNotificationRepository } from 'backend/app/conference/external/ConferenceNotificationRepository'
import { PushNotificationService } from 'backend/app/device/application/PushNotificationService'
import { EventListener } from 'backend/app/common/external/amqp/EventListener'
import { ConferenceNotificationSendRequest } from 'backend/app/conference/domain/ConferenceNotification'
import { DateProvider } from 'backend/app/common/DateProvider'
import { UserRepository } from 'backend/app/user/external/UserRepository'
import { DeviceRepository } from 'backend/app/device/external/DeviceRepository'
import { oneOf } from 'backend/app/common/CrudRepository'
import { Device } from 'backend/app/device/domain/Device'
import { PushNotificationRequest } from 'backend/app/device/domain/PushNotificationRequest'
import { ConferenceNotificationTargeter } from 'backend/app/conference/application/ConferenceNotificationTargeter'
import { NotificationTarget } from 'backend/app/conference/domain/NotificationTarget'

@Service()
export class ConferenceNotificationService {
  constructor(
    private conferenceNotificationRepository: ConferenceNotificationRepository,
    private pushNotificationService: PushNotificationService,
    private userRepository: UserRepository,
    private deviceRepository: DeviceRepository,
    private dateProvider: DateProvider,
    private notificationTargeter: ConferenceNotificationTargeter,
  ) {}

  @EventListener(ConferenceNotificationSendRequest)
  async handleSendNotificationsRequest(
    request: ConferenceNotificationSendRequest,
  ) {
    log.debug('[ConferenceNotificationService] Sending notification', request)

    const target = this.notificationTargeter.getTargetsForNotification(request)
    log.debug('[ConferenceNotificationService] Targeting notification', target)

    const devices = await this.getDevicesForTarget(target)
    log.debug('[ConferenceNotificationService] Matched devices', devices)

    await this.sendNotificationsToDevices(request, devices)
    await this.recordNotificationSent(request)
  }

  private async recordNotificationSent(
    request: ConferenceNotificationSendRequest,
  ) {
    return this.conferenceNotificationRepository.insert({
      ...request,
      timeSent: this.dateProvider.now(),
    })
  }

  private async sendNotificationsToDevices(
    request: ConferenceNotificationSendRequest,
    devices: Device[],
  ) {
    await this.pushNotificationService.sendNotifications(
      devices.flatMap(device => this.createPushNotifications(device, request)),
    )
  }

  private async getDevicesForTarget(target: NotificationTarget) {
    const users = await this.userRepository.find({
      optedIntoNotifications: true,
      ...target.user,
    })

    log.debug('[ConferenceNotificationService] Matched users', users)

    return this.deviceRepository.find({
      owner: oneOf(...users.map(u => u.id)),
      ...target.device,
    })
  }

  private createPushNotifications(
    device: Device,
    request: ConferenceNotificationSendRequest,
  ): PushNotificationRequest[] {
    if (!device.deviceToken) {
      return []
    }
    return [
      {
        deviceId: device.id,
        payload: {
          title: request.title,
          to: device.deviceToken,
          body: request.message,
          priority: request.urgent ? 'high' : 'normal',
          data: this.notificationTargeter.getNotificationMetadata(request),
          sound: request.urgent ? 'default' : null,
        },
      },
    ]
  }
}
