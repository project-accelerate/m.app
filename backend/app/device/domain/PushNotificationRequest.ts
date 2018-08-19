export interface PushNotificationRequest<Data = {}> {
  payload: {
    to: string
    data?: Data
    title?: string
    body?: string
    sound?: 'default' | null
    ttl?: number
    expiration?: number
    priority?: 'default' | 'normal' | 'high'
    badge?: number
  }
  deviceId: string
}
