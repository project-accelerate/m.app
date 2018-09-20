import { Notifications } from 'expo'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

export interface InAppNotificationProps {
  title: string
  message: string
  okLabel: string
}

export abstract class NotificationHandler<T> {
  constructor(
    protected notification: Notifications.Notification,
    protected navigator?: NavigationScreenProp<NavigationState>,
  ) {}

  abstract getInAppNotificationProps(): InAppNotificationProps

  get data(): T {
    return this.notification.data
  }

  getInitialRoute(): { routeName: string; routeParams: {} } | undefined {
    return undefined
  }

  handleNotification() {}
}

export interface NotificationHandlerType<T = {}> {
  new (
    notification: Notifications.Notification,
    navigator?: NavigationScreenProp<NavigationState>,
  ): NotificationHandler<T>

  acceptNotification(notification: Notifications.Notification): boolean
}

export function createNotificationHandler(
  handlers: NotificationHandlerType<{}>[],
  notification?: Notifications.Notification,
  navigation?: NavigationScreenProp<NavigationState>,
) {
  if (!notification) {
    return undefined
  }

  const type = handlers.find(x => x.acceptNotification(notification))
  if (type) {
    return new type(notification, navigation)
  }
}
