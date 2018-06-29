import { ObjectType, Field, GraphQLISODateTime, InputType } from 'type-graphql'
import { Point } from 'geojson'
import { FileUpload, GraphQLUpload } from 'apollo-upload-server'
import { GraphQLString } from 'graphql'

@InputType({
  description: 'Request properties to submit a new event',
})
export class CreateEventRequest {
  @Field() name!: string

  @Field() organiser!: string

  @Field(() => [GraphQLString])
  speakers!: string[]

  @Field() venue!: string

  @Field(() => GraphQLISODateTime)
  startTime!: Date

  @Field(() => GraphQLISODateTime)
  endTime!: Date

  @Field() introduction!: string

  @Field() detail!: string

  @Field(() => GraphQLUpload, {
    nullable: true,
  })
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
