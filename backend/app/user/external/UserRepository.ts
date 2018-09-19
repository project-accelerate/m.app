import {
  CrudRepository,
  CrudRepositoryConfig,
} from 'backend/app/common/CrudRepository'
import { User, UserProps } from '../domain/User'

const config: CrudRepositoryConfig<User> = {
  tableName: 'User',
  cache: {
    ttl: 120_000,
  },
}

export class UserRepository extends CrudRepository<User, UserProps>(config) {}
