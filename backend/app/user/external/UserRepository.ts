import {
  CrudRepository,
  CrudRepositoryConfig,
} from 'backend/app/common/CrudRepository'
import { User, UserProps } from '../domain/User'

const config: CrudRepositoryConfig<User> = {
  tableName: 'User',
}

export class UserRepository extends CrudRepository<User, UserProps>(config) {}
