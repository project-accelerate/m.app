import { ObjectType, Field } from "type-graphql";
import { Point } from 'geojson'

export interface VenueProps {
  name: string
  postcode: string
  location: Point
}

@ObjectType()
export class Venue implements VenueProps {
  @Field()
  id!: string

  @Field()
  name!: string

  @Field()
  postcode!: string

  location!: Point
}
