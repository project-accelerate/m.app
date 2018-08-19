import { Service } from 'typedi'
import { Point } from 'geojson'
import {
  CrudRepository,
  CrudRepositoryConfig,
} from '../../common/CrudRepository'
import { Event } from '../domain/Event'
import { Distance } from '../domain/Distance'
import { PointField } from '../../common/PointField'
import { PersonRepository } from './PersonRepository'

const config: CrudRepositoryConfig<Event> = {
  tableName: 'event',
  fieldConverters: {
    location: PointField,
  },
}

@Service()
export class EventRepository extends CrudRepository<Event>(config) {
  speakers = this.relationTo(PersonRepository, {
    name: 'event_speakers',

    sourceRef: 'event',
    destRef: 'speaker',
  })

  async findEventsbySpeaker(speaker: string) {
    return this.db.knex
      .select('*', ...this.customQueryFields)
      .from('event')
      .innerJoin('event_speakers', 'event.id', '=', 'event_speakers.event')
      .where('event_speakers.speaker', speaker)
      .then(res => this.decodeAll(res))
  }

  async findByTimeAndLocation(q: {
    location: Point
    distance: Distance
    fromTime: Date
    toTime: Date
  }): Promise<Event[]> {
    return this.db.knex
      .select('*', ...this.customQueryFields)
      .from(this.tableName)
      .where(
        this.db.gis.dwithin(
          'location',
          this.db.gis.geomFromGeoJSON(q.location),
          q.distance.inMeters,
          true,
        ),
      )
      .andWhere('startTime', '>=', q.fromTime)
      .andWhere('endTime', '<=', q.toTime)
      .orderBy('startTime')
      .then(res => this.decodeAll(res))
  }

}
