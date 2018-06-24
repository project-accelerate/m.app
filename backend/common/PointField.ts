import { Point } from 'geojson'
import { Container } from 'typedi'
import { DatabaseConnection } from './DatabaseConnection'
import Knex from 'knex'
import { FieldConverter } from './CrudRepository'

export const PointField: FieldConverter<Point> = {
  from: point => gis().geomFromGeoJSON(point),
  to: value => JSON.parse(value),
  query: column => gis().asGeoJSON(column),
}

function gis() {
  return Container.get(DatabaseConnection).gis
}
