import { Service } from 'typedi'
import {
  CrudRepository,
  CrudRepositoryConfig,
} from '../../common/CrudRepository'
import { Organiser } from '../domain/Organiser'

const config: CrudRepositoryConfig<Organiser> = {
  tableName: 'organiser',
}

@Service()
export class OrganiserRepository extends CrudRepository<Organiser>(config) {
  async findByEventSpokenAt(event: string) {
    return this.db.knex
      .select('organiser.*')
      .from('event_speakers')
      .innerJoin('organiser', 'organiser.id', '=', 'event_speakers.speaker')
      .where('organiser.id', event)
      .then(res => this.decodeAll(res))
  }
}
