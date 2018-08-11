import { AsyncStorage } from 'react-native'
import { ALWAYS_REGISTER_DEVICE } from '../../../config/properties'

export interface DeviceRegistrationState {
  userId: string
  deviceId: string
}

const DEVICE_REGISTRATION_STATE_KEY = 'DEVICE_REGISTRATION_STATE_KEY'

export async function getDeviceRegistrationState(): Promise<
  DeviceRegistrationState | undefined
> {
  if (ALWAYS_REGISTER_DEVICE) {
    return undefined
  }

  const state = await AsyncStorage.getItem(DEVICE_REGISTRATION_STATE_KEY)
  console.log('retreived registration state:', state)

  return typeof state === 'undefined' ? undefined : JSON.parse(state)
}

export async function setDeviceRegistrationState(
  state: DeviceRegistrationState,
) {
  console.log('saving registration state', state)

  await AsyncStorage.setItem(
    DEVICE_REGISTRATION_STATE_KEY,
    JSON.stringify(state),
  )
}

export async function clearDeviceRegistrationState() {
  console.log('clearing device registration state')

  await AsyncStorage.removeItem(DEVICE_REGISTRATION_STATE_KEY)
}
