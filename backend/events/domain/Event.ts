import { ObjectType, Field, GraphQLISODateTime, InputType } from 'type-graphql'
import { Point } from 'geojson'
import { Organiser } from './Organiser'
import { Venue } from './Venue'

@InputType({
  description: 'Request properties to submit a new event',
})
export class CreateEventRequest {
  @Field() name!: string

  @Field() organiserName!: string

  @Field() venueName!: string

  @Field(() => GraphQLISODateTime)
  startTime!: Date

  @Field(() => GraphQLISODateTime)
  endTime!: Date

  @Field() introduction!: string

  @Field() postcode!: string
}

@ObjectType()
export class Event {
  @Field() id!: string

  @Field() name!: string

  organiser!: string

  venue!: string

  @Field(() => GraphQLISODateTime)
  startTime!: Date

  @Field(() => GraphQLISODateTime)
  endTime!: Date

  @Field() introduction!: string

  location!: Point
}
