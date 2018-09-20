import stringify from 'json-stable-stringify'
import log from 'winston'

interface CachedRecord {
  expiry: number
  value: any
}

export interface CacheConfig {
  ttl: number
  purgeIntervalMinutes?: number
}

export class RepositoryCache {
  constructor(private config?: CacheConfig) {
    if (!this.config) {
      return
    }
    const { purgeIntervalMinutes = 120 } = this.config
    const purgeIntervalMs = purgeIntervalMinutes * 60_000

    setInterval(() => {
      this.cache.clear()
    }, purgeIntervalMs + Math.random() * purgeIntervalMs)
  }

  private cache = new Map<string, any>()

  resolve<T>(
    method: string,
    params: {},
    resolveFn: () => Promise<T>,
  ): Promise<T> {
    if (!this.config) {
      return resolveFn()
    }

    const { ttl } = this.config

    const key = method + '|' + stringify(params)
    const hit = this.cache.get(key)
    log.debug('[RepositoryCache]', {
      key,
      hit,
      useCached: hit ? hit.expiry < Date.now() : false,
    })

    if (hit && hit.expiry > Date.now()) {
      return hit.value
    }

    const value = resolveFn()
    const expiry = ttl + Date.now()
    this.cache.set(key, { value, expiry })

    return value
  }
}
