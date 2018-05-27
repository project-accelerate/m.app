import { CrudRepository, CrudRepositoryConfig } from "../../../common/CrudRepository";
import { Venue, VenueProps } from "../domain/Venue";
import { pointFieldConverter } from "../../../common/gis";

const config: CrudRepositoryConfig<Venue> = {
  tableName: 'venue',
  fieldConverters: {
    location: pointFieldConverter
  }
}

export class VenueRepository extends CrudRepository<Venue, VenueProps>(config) {
}
