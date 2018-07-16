import decode from 'jwt-decode'
import { AuthToken } from 'common/AuthToken'

/** Treat token as expired a minute before it actually expires */
const EXPIRY_WINDOW = 60_000

/**
 * Represente the current auth state of the application
 **/
export class TokenState {
  private decodedToken =
    (this.authToken && decode<AuthToken>(this.authToken)) || undefined

  constructor(
    /** JWT-encoded user credentials */
    public readonly authToken?: string,
    private readonly getDateTime = Date.now,
  ) {}

  /** Expiry time in milliseconds */
  get expiry() {
    if (!this.decodedToken) {
      return 0
    }

    return this.decodedToken.exp * 1000 - EXPIRY_WINDOW
  }

  /** Decoded claims about the current user, or undefined if not authenticated */
  get authProps() {
    if (!this.decodedToken) {
      return undefined
    }

    if (this.getDateTime() > this.expiry) {
      return undefined
    }

    return this.decodedToken
  }

  /** Return true if the user is logged in and has the requested role */
  hasRole(role: string) {
    if (this.authProps) {
      return this.authProps['http://peoplesmomentum.com/roles'].includes(role)
    }

    return false
  }
}
