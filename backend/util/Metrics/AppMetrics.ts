import { Service } from 'typedi'
import log from 'winston'
import { ConfigService } from 'backend/app/common/ConfigService'

@Service()
export class AppMetrics {
  constructor(config: ConfigService) {
    const user = config.getOptional('LIBRATO_USER')
    const token = config.getOptional('LIBRATO_TOKEN')

    if (user && token) {
      this.librato = require('librato-node')
      this.librato.configure({ email: user, token })
      this.librato.start()

      process.once('SIGINT', () => {
        this.librato.stop() // stop optionally takes a callback
      })

      this.librato.on('error', (err: any) => {
        log.error(`[AppMetrics] ${err.message}`)
      })
    }
  }

  private librato: any

  increment(key: string, value: number) {
    this.ifInitialized(() => {
      this.librato.increment(key, value)
    })
  }

  measure(key: string, value: number) {
    this.ifInitialized(() => {
      this.librato.measure(key, value)
    })
  }

  async measureTime<T>(key: string, fn: () => Promise<T>): Promise<T> {
    const start = Date.now()
    const result = await fn()

    this.measure(key, Date.now() - start)
    return result
  }

  private ifInitialized(fn: () => void) {
    if (this.librato) {
      fn()
    }
  }
}
