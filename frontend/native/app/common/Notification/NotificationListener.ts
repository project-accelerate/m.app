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
      activeInstance = this
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

      if (notification.origin === 'selected') {
        if (Platform.OS === 'ios') {
          const details = handler.getInAppNotificationProps()

          Alert.alert(details.title, details.message, [
            { text: 'Dismiss', style: 'cancel' },
            {
              text: details.okLabel,
              style: 'default',
              onPress: () => {
                this.handleNotificationSelected(handler)
              },
            },
          ])
        } else {
          this.handleNotificationSelected(handler)
        }
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

// [HACK]: Workaround for expo android back button bug
// expo seems to unsubscribe from back button presses when the app is backgrounded
// due to memory preassure. So we resubscribe on becoming active again.
// This doesn't strictly belong in this module....
let activeInstance: React.Component<NavigationInjectedProps> | undefined
if (Platform.OS === 'android') {
  AppState.addEventListener('change', state => {
    if (state === 'active') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        if (activeInstance) {
          activeInstance.props.navigation.goBack()
          return true
        }
      })
    }
  })
}
