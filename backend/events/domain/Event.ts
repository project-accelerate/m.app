import { ObjectType, Field, GraphQLISODateTime } from 'type-graphql'
import { Point } from 'geojson'
import { Organiser } from './Organiser'
import { Venue } from './Venue'

export interface EventProps {
  name: string
  organiser: string
  venue: string
  startTime: Date
  endTime: Date
  introduction: string
  location: Point
}

@ObjectType()
export class Event implements EventProps {
  @Field() id!: string

  @Field() name!: string

  @Field(() => Organiser)
  organiser!: string

  @Field(() => Venue)
  venue!: string

  @Field(() => GraphQLISODateTime)
  startTime!: Date

  @Field(() => GraphQLISODateTime)
  endTime!: Date

  @Field() introduction!: string

  location!: Point
}
