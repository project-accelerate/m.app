import stringify from 'json-stable-stringify'

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

  async resolve<T>(
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
    if (hit && hit.expiry < Date.now()) {
      return hit.value
    }

    const value = await resolveFn()
    const expiry = ttl + Date.now()
    this.cache.set(key, { value, expiry })

    return value
  }
}
