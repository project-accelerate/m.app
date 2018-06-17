import { Point } from 'geojson'
import knexGis from 'knex-postgis'
import { db } from '../db/db'
import { FieldConverter } from './CrudRepository'

export const gis = knexGis(db)

export const pointFieldConverter: FieldConverter<Point> = {
  from: point => gis.geomFromGeoJSON(point),
  to: value => JSON.parse(value),
  query: column => gis.asGeoJSON(column),
}
