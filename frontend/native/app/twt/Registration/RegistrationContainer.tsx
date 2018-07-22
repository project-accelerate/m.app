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
  AcceptNotificationsPanel,
  RegistrationBg,
} from './RegistrationPanels'
import { registerDevice, requestNotificationPermission } from './registerDevice'
import { EventFamily, DeviceType } from '../../../queries'

interface RegistrationContainerState {
  completed: boolean
  stage: React.ReactElement<{}>
  form: RegistrationFormState
}

interface RegistrationFormState {
  isConferenceDelegate: boolean
  optedIntoNotifications: boolean
}

let RegistrationState: DeviceRegistrationState | undefined

export class RegistrationContainer extends React.Component {
  panels = [
    <RegistrationIsDelegateQuestion
      onSubmit={this.submitHandler('isConferenceDelegate')}
    />,
    <AcceptNotificationsPanel
      onSubmit={this.submitHandler('optedIntoNotifications')}
    />,
  ]

  state: RegistrationContainerState = {
    stage: this.panels.shift()!,
    completed: typeof RegistrationState !== 'undefined',
    form: {
      isConferenceDelegate: false,
      optedIntoNotifications: true,
    },
  }

  static async setup() {
    RegistrationState = await getDeviceRegistrationState()
  }

  submitHandler<Key extends keyof RegistrationFormState>(key: Key) {
    return (value: RegistrationFormState[Key]) => {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          [key]: value,
        },
      })

      this.advancePanel()
    }
  }

  advancePanel() {
    const next = this.panels.shift()

    if (!next) {
      this.handleCompleted()
    }

    this.setState({ stage: next })
  }

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
    const { optedIntoNotifications } = this.state.form

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

  async handleCompleted() {
    const { device, user } = await this.getUserDeviceRegistrationRequest()

    const registration = await registerDevice({
      request: {
        attendances: this.state.form.isConferenceDelegate
          ? [EventFamily.LABOUR_2018, EventFamily.TWT_2018]
          : [EventFamily.TWT_2018],
        device,
        user,
      },
    })

    await setDeviceRegistrationState({
      deviceId: registration.device.id,
      userId: registration.user.id,
    })

    this.setState({ completed: true })
  }

  render() {
    if (this.state.completed) {
      return this.props.children
    }

    return <RegistrationBg>{this.state.stage}</RegistrationBg>
  }
}
