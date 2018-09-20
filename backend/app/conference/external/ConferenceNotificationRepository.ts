import {
  CrudRepository,
  CrudRepositoryConfig,
} from 'backend/app/common/CrudRepository'
import { ConferenceNotification } from '../domain/ConferenceNotification'

const config: CrudRepositoryConfig<ConferenceNotification> = {
  tableName: 'ConferenceNotification',
  cache: {
    ttl: 10_000,
  },
}

export class ConferenceNotificationRepository extends CrudRepository(config) {}
