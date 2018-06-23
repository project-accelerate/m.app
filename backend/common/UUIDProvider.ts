import { Service } from 'typedi'
import uuid from 'uuid'

@Service()
export class UUIDProvider {
  generate() {
    return uuid()
  }
}
