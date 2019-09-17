import { NativeModules } from 'react-native'
import Constants from 'expo-constants'

const substitutions = {
  $PACKAGER_HOSTNAME: getPackagerHostname(),
}

export const BACKEND_URL = configProperty('backendUrl')
export const PROFILE = configProfile()
export const SENTRY_URL = configProperty('sentryUrl')

console.log(`Running with ${configProfile()} profile`)

function configProfile() {
  const { extra = {}, releaseChannel } = Constants.manifest
  const devChannel = extra.local ? 'local' : 'development'

  return releaseChannel || devChannel
}

/** Look up config property based on environment */
function configProperty<T = string>(
  key: string,
  opts: { defaultValue?: T } = {},
): T {
  const profile = configProfile()
  const configs = require('../env.json')

  const mergedConfigs = {
    ...configs.common,
    ...configs[profile],
  }

  return applySubstitutions(mergedConfigs[key] || opts.defaultValue)
}

/** When running in development mode, return the devserver's hostname */
function getPackagerHostname() {
  if (Constants.appOwnership === 'standalone') {
    return undefined
  }

  const scriptURL = NativeModules.SourceCode.scriptURL

  const address = scriptURL.split('://')[1].split('/')[0]
  return address.split(':')[0]
}

/** Apply variable substitutions from substitution map in this file */
function applySubstitutions(value: any) {
  if (typeof value !== 'string') {
    return value
  }

  return Object.keys(substitutions).reduce(substitute, value)
}

/** Single pass of variable substiutitons */
function substitute(source: string, key: string) {
  const sub = (substitutions as any)[key]
  const value = typeof sub === 'function' ? sub() : sub

  return source.replace(key, value)
}
