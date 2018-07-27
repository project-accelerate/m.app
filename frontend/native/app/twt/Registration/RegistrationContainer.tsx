import React from 'react'
import { Platform, Text, ActivityIndicator, View } from 'react-native'
import { Notifications } from 'expo'

import {
  DeviceRegistrationState,
  getDeviceRegistrationState,
  setDeviceRegistrationState,
} from './DeviceRegistrationState'
import {
  RegistrationIsDelegateQuestion,
  RegistrationBg,
  AcceptNotificationsPanel,
} from './RegistrationPanels'
import { registerDevice, requestNotificationPermission } from './registerDevice'
import { EventFamily, DeviceType } from '../../../queries'
import { LoadingOverlay } from '../../common/Widgets/Widgets'
import { createTransition } from '../../common/Layouts/Transitioner'
import { theme } from '../../../theme'
import { RegistrationProvider } from './UserProvider'

interface RegistrationContainerState {
  skipped: boolean
  isConferenceDelegate: boolean
  optedIntoNotifications: boolean
}

let RegistrationState: DeviceRegistrationState | undefined

export class RegistrationContainer extends React.Component<
  {},
  RegistrationContainerState
> {
  state = {
    skipped: typeof RegistrationState !== 'undefined',
    isConferenceDelegate: false,
    optedIntoNotifications: true,
  }

  static async setup() {
    RegistrationState = await getDeviceRegistrationState()
  }

  stages = [
    <RegistrationIsDelegateQuestion
      onSubmit={this.answer('isConferenceDelegate')}
    />,
    <AcceptNotificationsPanel
      onSubmit={this.answer('optedIntoNotifications')}
    />,
  ]

  initialStage = this.stages.shift()!

  transitioner = createTransition()

  getDeviceType() {
    if (Platform.OS === 'ios') {
      return DeviceType.IOS
    }

    if (Platform.OS === 'android') {
      return DeviceType.ANDROID
    }

    return undefined
  }

  async getUserDeviceRegistrationRequest() {
    const { optedIntoNotifications } = this.state

    const deviceToken =
      optedIntoNotifications && (await requestNotificationPermission())
        ? await Notifications.getExpoPushTokenAsync()
        : undefined

    return {
      user: {
        optedIntoNotifications,
      },
      device: {
        deviceToken,
        deviceType: this.getDeviceType(),
      },
    }
  }

  async register() {
    const { device, user } = await this.getUserDeviceRegistrationRequest()

    const registration = await registerDevice({
      request: {
        attendances: this.state.isConferenceDelegate
          ? [EventFamily.LABOUR_2018, EventFamily.TWT_2018]
          : [EventFamily.TWT_2018],
        device,
        user,
      },
    })

    const RegistrationState = {
      deviceId: registration.device.id,
      userId: registration.user.id,
    }

    await setDeviceRegistrationState(RegistrationState)
  }

  answer<Key extends keyof RegistrationContainerState>(key: Key) {
    return (value: RegistrationContainerState[Key]) => {
      this.setState({ [key]: value } as any)
      const next = this.stages.shift()

      if (next) {
        this.transitioner.transitionTo(next)
      } else {
        this.transitioner
          .transitionTo(<LoadingOverlay />)
          .then(() => this.register())
          .then(() => this.setState({ skipped: true }))
      }
    }
  }

  render() {
    if (this.state.skipped) {
      return (
        <RegistrationProvider value={RegistrationState!}>
          {this.props.children}
        </RegistrationProvider>
      )
    }

    return (
      <RegistrationBg>
        {this.transitioner.render({ initialContent: this.initialStage })}
      </RegistrationBg>
    )
  }
}
