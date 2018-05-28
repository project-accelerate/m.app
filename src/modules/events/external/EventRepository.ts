import { Point } from "geojson";
import { CrudRepository, CrudRepositoryConfig } from "../../../common/CrudRepository";
import { gis, pointFieldConverter } from "../../../common/gis";
import { Event, EventProps } from "../domain/Event";
import { Distance } from "../domain/Distance";

const config: CrudRepositoryConfig<Event> = {
  tableName: 'event',
  fieldConverters: {
    location: pointFieldConverter
  }
}

export class EventRepository extends CrudRepository<Event, EventProps>(config) {
  async findByTimeAndLocation(q: { location: Point, distance: Distance, fromTime: Date, toTime: Date }): Promise<Event[]> {
    return this.db
      .select('*', ...this.customQueryFields)
      .from(this.tableName)
      .where(
        gis.dwithin(
          'location',
          gis.geomFromGeoJSON(q.location),
          q.distance.inMeters,
          true
        )
      )
      .andWhere('startTime', '>=', q.fromTime)
      .andWhere('endTime', '<=', q.toTime)
      .orderBy('startTime')
      .then(res => this.decodeAll(res))
  }
}
