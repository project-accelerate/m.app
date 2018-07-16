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
}

@Service()
export class VenueRepository extends CrudRepository<Venue>(config) {}
