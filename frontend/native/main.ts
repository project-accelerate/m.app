import KeepAwake from 'expo-keep-awake'
import App from './App'
import Sentry from 'sentry-expo'
import { SENTRY_URL } from './config/properties'
import { registerRootComponent } from 'expo'

Sentry.config(SENTRY_URL).install()

if (__DEV__) {
  KeepAwake.activate()
}

registerRootComponent(App)
