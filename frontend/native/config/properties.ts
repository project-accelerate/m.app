import { NativeModules } from 'react-native'
import { Constants } from 'expo'

const substitutions = {
  $PACKAGER_HOSTNAME: getPackagerHostname,
}

export const BACKEND_URL = configProperty('backendUrl')

/** Look up config property based on environment */
function configProperty(key: string, opts: { defaultValue?: string } = {}) {
  const { releaseChannel = 'development' } = Constants.manifest
  const configs = require('../env.json')

  if (releaseChannel in configs) {
    return applySubstitutions(configs[releaseChannel][key] || opts.defaultValue)
  }

  return applySubstitutions(configs.common[key] || opts.defaultValue)
}

/** When running in development mode, return the devserver's hostname */
function getPackagerHostname() {
  const scriptURL = NativeModules.SourceCode.scriptURL

  const address = scriptURL.split('://')[1].split('/')[0]
  return address.split(':')[0]
}

/** Apply variable substitutions from substitution map in this file */
function applySubstitutions(value: string) {
  return Object.keys(substitutions).reduce(substitute, value)
}

/** Single pass of variable substiutitons */
function substitute(source: string, key: string) {
  const sub = (substitutions as any)[key]
  const value = typeof sub === 'function' ? sub() : sub

  return source.replace(key, value)
}
