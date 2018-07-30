import React from 'react'
import { Platform } from 'react-native'
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
  RegistrationAskEmailPanel,
} from './RegistrationPanels'
import { registerDevice, requestNotificationPermission } from './registerDevice'
import { EventFamily, DeviceType } from '../../../queries'
import { LoadingOverlay } from '../../common/Widgets/Widgets'
import { createTransition } from '../../common/Layouts/Transitioner'
import { RegistrationProvider } from './UserProvider'

interface RegistrationContainerState {
  registrationState?: DeviceRegistrationState
  isConferenceDelegate: boolean
  optedIntoNotifications: boolean
  email?: string
}

let InitialRegistrationState: DeviceRegistrationState | undefined

export class RegistrationContainer extends React.Component<
  {},
  RegistrationContainerState
> {
  state = {
    registrationState: InitialRegistrationState,
    isConferenceDelegate: false,
    optedIntoNotifications: true,
  }

  static async setup() {
    InitialRegistrationState = await getDeviceRegistrationState()
  }

  stages = [
    <RegistrationIsDelegateQuestion
      onSubmit={this.answer('isConferenceDelegate')}
    />,
    <RegistrationAskEmailPanel onSubmit={this.answer('email')} />,
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

    const registrationState = {
      deviceId: registration.device.id,
      userId: registration.user.id,
    }

    await setDeviceRegistrationState(registrationState)

    this.setState({ registrationState })
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
      }
    }
  }

  render() {
    if (this.state.registrationState) {
      return (
        <RegistrationProvider value={this.state.registrationState}>
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
