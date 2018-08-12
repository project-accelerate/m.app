import {
  CrudRepository,
  CrudRepositoryConfig,
} from 'backend/app/common/CrudRepository'
import { ConferenceAttendance } from '../domain/ConferenceAttendance'

const config: CrudRepositoryConfig<ConferenceAttendance> = {
  tableName: 'ConferenceAttendance',
}

export class ConferenceAttendanceRepository extends CrudRepository(config) {
  
}
