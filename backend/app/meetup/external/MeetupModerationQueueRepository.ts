import {
  CrudRepository,
  CrudRepositoryConfig,
} from 'backend/app/common/CrudRepository'
import { Meetup } from 'backend/app/meetup/domain/Meetup'

const config: CrudRepositoryConfig<Meetup> = {
  tableName: 'MeetupsModerationQueue',
  cache: {
    ttl: 120_000,
  },
}

export class MeetupRepository extends CrudRepository<Meetup>(config) {}
