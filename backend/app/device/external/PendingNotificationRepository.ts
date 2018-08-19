import {
  CrudRepository,
  CrudRepositoryConfig,
} from 'backend/app/common/CrudRepository'
import { PendingNotification } from '../domain/PendingNotification'

const config: CrudRepositoryConfig<PendingNotification> = {
  tableName: 'PendingNotification',
}

export class PendingNotificationRepository extends CrudRepository<PendingNotification>(config) {}
