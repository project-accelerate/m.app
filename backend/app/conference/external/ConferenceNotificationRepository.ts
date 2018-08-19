import {
  CrudRepository,
  CrudRepositoryConfig,
} from 'backend/app/common/CrudRepository'
import { ConferenceNotification } from '../domain/ConferenceNotification'

const config: CrudRepositoryConfig<ConferenceNotification> = {
  tableName: 'ConferenceNotification',
}

export class ConferenceNotificationRepository extends CrudRepository(config) {}
