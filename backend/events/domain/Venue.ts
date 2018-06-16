import { ObjectType, Field } from "type-graphql";
import { Point } from 'geojson'
import { String } from "aws-sdk/clients/transcribeservice";

export interface VenueProps {
  name: string
  postcode: string
}

@ObjectType()
export class Venue implements VenueProps {
  @Field()
  id!: string

  @Field()
  name!: string

  @Field()
  postcode!: string
}
