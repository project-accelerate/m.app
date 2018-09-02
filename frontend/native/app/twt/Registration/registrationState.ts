import { ReducerAction, AppState } from '../../../state'
import { Dispatch } from 'redux'
import { Permissions, Notifications } from 'expo'
import {
  RegisterDeviceMutationVariables,
  RegisterDeviceMutation,
  DeviceType,
  EventFamily,
} from '../../../queries'
import RegisterDeviceMutationQueryDocument from './RegisterDeviceMutation.graphql'
import { graphQlClient } from '../../../config/graphql'
import { Platform } from 'react-native'
import { createLogger } from '../../common/logger'

export namespace registration {
  const log = createLogger('registration')

  export interface State {
    userId: string
    deviceId: string
  }

  type Action = { type: 'DeviceRegistration.succeeded'; registration: State }

  interface RegistrationRequestProps {
    isConferenceDelegate: boolean
    optedIntoNotifications: boolean
    email?: string
  }

  export const actions = {
    register: (props: RegistrationRequestProps) => async (
      dispatch: Dispatch<Action>,
    ) => {
      log('Registering with', props)
      const { device, user } = await getUserDeviceRegistrationRequest(props)

      const registration = await registerDevice({
        request: {
          attendances: props.isConferenceDelegate
            ? [EventFamily.LABOUR_2018, EventFamily.TWT_2018]
            : [EventFamily.TWT_2018],
          device,
          user,
        },
      })

      dispatch({
        type: 'DeviceRegistration.succeeded',
        registration: {
          deviceId: registration.device.id,
          userId: registration.user.id,
        },
      })
    },
  }

  export const reducers = {
    registration: (
      prev: State | null = null,
      action: ReducerAction<Action>,
    ) => {
      if (action.type === 'DeviceRegistration.succeeded') {
        return action.registration
      }

      return prev
    },
  }

  export const selectors = {
    registration: ({ registration }: AppState) => {
      if (!registration) {
        throw Error('Expected registration to be present')
      }

      return registration
    },
    optionalRegistration: ({ registration }: AppState) => {
      return registration
    },
    userId: (state: AppState) => {
      return selectors.registration(state).userId
    },
  }

  async function getUserDeviceRegistrationRequest({
    optedIntoNotifications,
    email,
  }: RegistrationRequestProps) {
    const deviceToken =
      optedIntoNotifications && (await requestNotificationPermission())
        ? await Notifications.getExpoPushTokenAsync()
        : undefined

    return {
      user: {
        optedIntoNotifications,
        email,
      },
      device: {
        deviceToken,
        deviceType: getDeviceType(),
      },
    }
  }

  async function requestNotificationPermission() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    )

    log('Existing status is', existingStatus)
    let finalStatus = existingStatus

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }

    log('Final status is', existingStatus)

    return finalStatus === 'granted'
  }

  export async function registerDevice(
    variables: RegisterDeviceMutationVariables,
  ): Promise<RegisterDeviceMutation['registration']> {
    const result = await graphQlClient.mutate({
      mutation: RegisterDeviceMutationQueryDocument,
      variables,
    })

    if (!result.data) {
      throw Error(result.errors && result.errors.join('; '))
    }

    return result.data && result.data.registration
  }

  function getDeviceType() {
    if (Platform.OS === 'ios') {
      return DeviceType.IOS
    }

    if (Platform.OS === 'android') {
      return DeviceType.ANDROID
    }

    return undefined
  }
}
