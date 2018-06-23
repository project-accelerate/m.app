import { Service } from 'typedi'
import {
  CrudRepository,
  CrudRepositoryConfig,
} from '../../common/CrudRepository'
import { Venue } from '../domain/Venue'

const config: CrudRepositoryConfig<Venue> = {
  tableName: 'venue',
}

@Service()
export class VenueRepository extends CrudRepository<Venue>(config) {}
