import { Service } from 'typedi'

@Service()
export class ConfigService {
  constructor(public configs = process.env) {}

  get(variable: string) {
    const value = this.configs[variable]
    if (!value) {
      throw Error(`Missing required config: ${variable}`)
    }

    return value
  }

  getOptional(variable: string) {
    return this.configs[variable]
  }
}
