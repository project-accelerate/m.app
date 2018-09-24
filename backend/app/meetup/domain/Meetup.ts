import { Field, GraphQLISODateTime, InputType, ObjectType } from 'type-graphql'
import { Point } from 'geojson'
import { User } from 'backend/app/user/domain/User'

@InputType({
  description: 'Request properties to submit a new meetup',
})
export class CreateMeetupRequest {
  @Field() userId!: string

  @Field() deviceId!: string

  @Field() name!: string

  @Field(() => GraphQLISODateTime)
  startTime!: Date

  @Field(() => GraphQLISODateTime)
  endTime!: Date

  @Field() introduction!: string

  @Field() detail!: string

  @Field() venueName!: string

  @Field() hostedBy!: string
}

@ObjectType()
export class Meetup {
  @Field() id!: string

  @Field() name!: string

  @Field(() => GraphQLISODateTime)
  startTime!: Date

  @Field(() => GraphQLISODateTime)
  endTime!: Date

  @Field() introduction!: string

  @Field() detail!: string

  @Field() venueName!: string

  @Field() hostedBy!: string

  @Field() user!: User
}
