import { Service } from 'typedi'
import {
  CrudRepository,
  CrudRepositoryConfig,
} from '../../common/CrudRepository'
import { Venue } from '../domain/Venue'
import { PointField } from '../../common/PointField'

const config: CrudRepositoryConfig<Venue> = {
  tableName: 'venue',
  fieldConverters: {
    location: PointField,
  },
  cache: {
    ttl: 120_000,
  },
}

@Service()
export class VenueRepository extends CrudRepository<Venue>(config) {}
