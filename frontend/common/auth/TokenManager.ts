import eventEmitter from 'event-emitter'
import { TokenState } from './TokenState'

export interface TokenManagerConfig {
  /** Interface for loading and saving user authentication details */
  storageProvider: StorageProvider
}

/** Interface for loading and saving user authentication details */
export type StorageProvider = Pick<
  Storage,
  'getItem' | 'setItem' | 'removeItem'
>

/**
 * Service class for managing token state changes.
 */
export class TokenManager {
  private state?: TokenState
  private ee = eventEmitter({})

  constructor(private storage: StorageProvider) {}

  /** Replace, and save, the current user credentials */
  setToken(token: string | undefined) {
    this.state = new TokenState(token)
    this.ee.emit('change', this.current)

    if (token) {
      this.storage.setItem('auth_token', token)
    } else {
      this.storage.removeItem('auth_token')
    }
  }

  /** Subscribe to credentials change events */
  on(event: 'change', fn: (token: TokenState) => void) {
    this.ee.on(event, fn)
  }

  /** Unsubscribe from credentials change events */
  off(event: 'change', fn: (token: TokenState) => void) {
    this.ee.off(event, fn)
  }

  /** Return the current authentication state */
  get current() {
    if (!this.state) {
      this.state = new TokenState(this.loadToken())
    }

    return this.state
  }

  private loadToken() {
    return this.storage.getItem('auth_token') || undefined
  }
}
