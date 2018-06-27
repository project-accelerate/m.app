/** Injected properties passed through from server */
declare const __CONFIG__: Record<string, string> | undefined

export const POSTCODES_URL = 'http://postcodes.io'
export const BACKEND_URL = injectedProperty('BACKEND_URL', { defaultValue: '' })
export const AUTH0_DOMAIN = injectedProperty('AUTH0_DOMAIN')
export const AUTH0_CLIENT_ID = injectedProperty('AUTH0_CLIENT_ID')

/**
 * Get an injected property, falling back to key as placeholder if
 * not running client-side (eg in unit tests)
 */
function injectedProperty(key: string, opts: { defaultValue?: string } = {}) {
  if (typeof __CONFIG__ === 'undefined') {
    if (typeof opts.defaultValue === 'undefined') {
      return key
    }

    return opts.defaultValue
  }

  return __CONFIG__[key]
}
