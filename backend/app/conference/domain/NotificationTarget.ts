import { User } from 'backend/app/user/domain/User'
import { Device } from 'backend/app/device/domain/Device'

export interface NotificationTarget {
  user?: Partial<User>
  device?: Partial<Device>
}
