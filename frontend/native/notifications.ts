import { EventReminderNotificationHandler } from './app/twt/Calendar/EventReminderNotification'
import { NotificationHandlerType } from './app/common/Notification/NotificationHandler'
import { NewsHandler } from './app/twt/News/NewsHandler'

export function notificationHandlers(): NotificationHandlerType[] {
  return [EventReminderNotificationHandler, NewsHandler]
}
