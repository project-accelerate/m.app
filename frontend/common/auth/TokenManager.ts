import eventEmitter from 'event-emitter'
import { TokenState } from './TokenState'

export interface TokenManagerConfig {
  /** Interface for loading and saving user authentication details */
  storageProvider: StorageProvider
}

/** Interface for loading and saving user authentication details */
export interface StorageProvider {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
}

type ChangeHandler = (token: TokenState) => void

/**
 * Service class for managing token state changes.
 */
export class TokenManager {
  private state?: TokenState
  private subscribers = new Set<ChangeHandler>()

  constructor(private storage: StorageProvider) {}

  /** Replace, and save, the current user credentials */
  setToken(token: string | undefined) {
    const newState = (this.state = new TokenState(token))

    this.subscribers.forEach(s => s(newState))

    if (token) {
      this.storage.setItem('auth_token', token)
    } else {
      this.storage.removeItem('auth_token')
    }
  }

  /** Subscribe to credentials change events */
  on(event: 'change', fn: ChangeHandler) {
    this.subscribers.add(fn)
  }

  /** Unsubscribe from credentials change events */
  off(event: 'change', fn: ChangeHandler) {
    this.subscribers.delete(fn)
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
