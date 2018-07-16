import { Service } from 'typedi'

@Service()
export class ConfigService {
  constructor(public configs = process.env) {}

  private forceOptional = false

  makeOptional() {
    this.forceOptional = true
  }

  get(variable: string) {
    if (this.forceOptional) {
      return this.configs[variable] || variable
    }

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
