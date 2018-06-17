import decode from 'jwt-decode'
import { AuthToken } from '../../../common/AuthToken'

/**
 * Represente the current auth state of the application
 **/
export class TokenState {
  constructor(
    /** JWT-encoded user credentials */
    public readonly authToken?: string,
  ) {}

  /** Decoded claims about the current user, or undefined if not authenticated */
  readonly authProps?: AuthToken =
    (this.authToken && decode<AuthToken>(this.authToken)) || undefined

  /** Return true if the user is logged in and has the requested role */
  hasRole(role: string) {
    if (this.authProps) {
      return this.authProps.roles.includes(role)
    }

    return false
  }
}
