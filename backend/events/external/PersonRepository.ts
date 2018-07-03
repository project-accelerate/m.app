import { Service } from 'typedi'
import {
  CrudRepository,
  CrudRepositoryConfig,
} from '../../common/CrudRepository'
import { Person } from '../domain/Person'

const config: CrudRepositoryConfig<Person> = {
  tableName: 'person',
}

@Service()
export class PersonRepository extends CrudRepository<Person>(config) {
  async findByEventSpokenAt(event: string) {
    return this.db.knex
      .select('person.*')
      .from('event_speakers')
      .innerJoin('person', 'person.id', '=', 'event_speakers.speaker')
      .where('person.id', event)
      .then(res => this.decodeAll(res))
  }
}
