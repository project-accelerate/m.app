import {
  CrudRepository,
  CrudRepositoryConfig,
} from 'backend/app/common/CrudRepository'
import { Device } from '../domain/Device'

const config: CrudRepositoryConfig<Device> = {
  tableName: 'Device',
}

export class DeviceRepository extends CrudRepository(config) {}
