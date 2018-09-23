import React from 'react'
import { withNavigation, NavigationInjectedProps } from 'react-navigation'
import { Notifications } from 'expo'
import { EventSubscription } from 'fbemitter'
import { createLogger } from '../logger'
import {
  createNotificationHandler,
  NotificationHandler,
} from './NotificationHandler'
import { notificationHandlers } from '../../../notifications'
import { Routes } from '../../../routes'
import { AppState, Platform, BackHandler, Alert } from 'react-native'

export const NotificationListener = (withNavigation(
  class NotificationListener extends React.Component<NavigationInjectedProps> {
    subscription!: EventSubscription
    logger = createLogger('Notifications')
    listener: any

    componentDidMount() {
      this.subscription = Notifications.addListener(this.handleNotification)
    }

    componentWillUnmount() {
      this.subscription.remove()
    }

    handleNotification = (notification: Notifications.Notification) => {
      this.logger('Received notification', notification)

      const handler = createNotificationHandler(
        notificationHandlers(),
        notification,
        this.props.navigation,
      )
      if (!handler) {
        this.logger('No matching notification handler')
        return
      }

      this.logger('Matched notitication handler', handler.constructor)
      handler.handleNotification()

      if (notification.origin === 'received') {
        if (Platform.OS === 'ios') {
          const details = handler.getInAppNotificationProps()

          Alert.alert(details.title, details.message, [
            { text: 'Dismiss', style: 'cancel' },
            {
              text: details.okLabel,
              style: 'default',
              onPress: () => {
                setTimeout(() => {
                  this.handleNotificationSelected(handler)
                })
              },
            },
          ])
        }
      } else {
        this.handleNotificationSelected(handler)
      }
    }

    handleNotificationSelected(handler: NotificationHandler<any>) {
      const route = handler.getInitialRoute()
      if (route) {
        this.logger('Navigating to route', route)
        this.props.navigation.push(route.routeName, route.routeParams)
      }
    }

    render() {
      return null
    }
  },
) as any) as React.ComponentClass<{}>
