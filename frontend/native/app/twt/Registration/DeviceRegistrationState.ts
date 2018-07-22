import { AsyncStorage } from 'react-native'

export interface DeviceRegistrationState {
  userId: string
  deviceId: string
}

const DEVICE_REGISTRATION_STATE_KEY = 'DEVICE_REGISTRATION_STATE_KEY'

export async function getDeviceRegistrationState(): Promise<
  DeviceRegistrationState
> {
  const state = await AsyncStorage.getItem(DEVICE_REGISTRATION_STATE_KEY)
  console.log('retreived registration state:', state)

  return typeof state === 'undefined' ? undefined : JSON.parse(state)
}

export function setDeviceRegistrationState(
  state: DeviceRegistrationState,
): Promise<void> {
  console.log('saving registration state', state)

  return AsyncStorage.setItem(
    DEVICE_REGISTRATION_STATE_KEY,
    JSON.stringify(state),
  )
}
