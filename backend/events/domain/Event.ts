import { ObjectType, Field, GraphQLISODateTime, InputType } from 'type-graphql'
import { Point } from 'geojson'
import { Organiser } from './Organiser'
import { Venue } from './Venue'
import { FileUpload, GraphQLUpload } from 'apollo-upload-server'
import { Photo } from './Photo'

@InputType({
  description: 'Request properties to submit a new event',
})
export class CreateEventRequest {
  @Field() name!: string

  @Field() organiser!: string

  @Field() venue!: string

  @Field(() => GraphQLISODateTime)
  startTime!: Date

  @Field(() => GraphQLISODateTime)
  endTime!: Date

  @Field() introduction!: string

  @Field() detail!: string

  @Field(() => GraphQLUpload)
  photoUpload?: FileUpload
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

  @Field() detail!: string

  photo?: string

  location!: Point
}
