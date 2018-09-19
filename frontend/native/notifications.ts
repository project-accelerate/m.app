import { EventReminderNotificationHandler } from './app/twt/Calendar/EventReminderNotification'
import { NotificationHandlerType } from './app/common/Notification/NotificationHandler'

export function notificationHandlers(): NotificationHandlerType[] {
  return [EventReminderNotificationHandler]
}
