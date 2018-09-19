import { Service } from 'typedi'
import {
  CrudRepository,
  CrudRepositoryConfig,
} from '../../common/CrudRepository'
import { Person } from '../domain/Person'
import { RepositoryCache } from 'backend/app/common/RepositoryCache'

const config: CrudRepositoryConfig<Person> = {
  tableName: 'person',
  cache: {
    ttl: 120_000,
  },
}

@Service()
export class PersonRepository extends CrudRepository<Person>(config) {
  private cache = new RepositoryCache(config.cache)

  findByEventSpokenAt(event: string) {
    return this.cache.resolve('findByEventSpokenAt', event, async () => {
      return this.db.knex
        .select('person.*')
        .from('event_speakers')
        .innerJoin('person', 'person.id', '=', 'event_speakers.speaker')
        .where('person.id', event)
        .then(res => this.decodeAll(res))
    })
  }
}
