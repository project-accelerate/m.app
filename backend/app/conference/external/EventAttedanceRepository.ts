import {
  CrudRepository,
  CrudRepositoryConfig,
} from 'backend/app/common/CrudRepository'
import { EventAttendance } from '../domain/EventAttendance'

const config: CrudRepositoryConfig<EventAttendance> = {
  tableName: 'EventAttendance',
}

export class EventAttendanceRepository extends CrudRepository(config) {
  
}
