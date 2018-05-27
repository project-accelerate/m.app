import { ObjectType, Field, GraphQLISODateTime } from "type-graphql";

export interface EventProps {
  name: string
  organiser: string
  venue: string
  startTime: Date
  endTime: Date
  introduction: string
}

@ObjectType()
export class Event implements EventProps {
  @Field()
  id!: string

  @Field()
  name!: string

  @Field()
  organiser!: string

  @Field()
  venue!: string

  @Field(() => GraphQLISODateTime)
  startTime!: Date

  @Field(() => GraphQLISODateTime)
  endTime!: Date

  @Field()
  introduction!: string
}
