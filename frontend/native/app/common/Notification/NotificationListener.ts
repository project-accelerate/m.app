import React from 'react'
import { withNavigation, NavigationInjectedProps } from 'react-navigation'
import { Notifications } from 'expo'
import { EventSubscription } from 'fbemitter'
import { createLogger } from '../logger'
import { createNotificationHandler } from './NotificationHandler'
import { notificationHandlers } from '../../../notifications'
import { Routes } from '../../../routes'

export const NotificationListener = withNavigation(
  class NotificationListener extends React.Component<NavigationInjectedProps> {
    subscription!: EventSubscription
    logger = createLogger('Notifications')

    componentDidMount() {
      this.subscription = Notifications.addListener(this.handleNotification)
    }

    handleNotification = (notification: Notifications.Notification) => {
      this.logger('Received notification', notification)

      const handler = createNotificationHandler(
        notificationHandlers,
        notification,
        this.props.navigation,
      )
      if (!handler) {
        this.logger('No matching notification handler')
        return
      }

      this.logger('Matched notitication handler', handler.constructor)
      handler.handleNotification()

      if (notification.origin === 'selected') {
        const route = handler.getInitialRoute()
        if (route) {
          this.logger('Navigating to route', route)
          this.props.navigation.push(route.routeName, route.routeParams)
        }
      }
    }

    render() {
      return null
    }
  },
)
