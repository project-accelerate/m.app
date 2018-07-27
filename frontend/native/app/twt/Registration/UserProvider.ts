import React from 'react'
import { DeviceRegistrationState } from './DeviceRegistrationState'

const { Provider, Consumer } = React.createContext<DeviceRegistrationState>(
  undefined as any,
)

export const RegistrationProvider = Provider
export const WithRegistration = Consumer
