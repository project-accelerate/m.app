import { start } from './start'
import { publishFrontendNative } from './build'

export function release() {
  if (process.env.EXPO_RELEASE_CHANNEL) {
    publishFrontendNative(process.env.EXPO_RELEASE_CHANNEL)
  }

  start('backend', 'release')
}
