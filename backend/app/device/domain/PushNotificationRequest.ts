export interface PushNotificationRequest<Data = {}> {
  payload: PushNotificationPayload<Data>
  deviceId: string
}

export interface PushNotificationPayload<Data = {}> {
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
