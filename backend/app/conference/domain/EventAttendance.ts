import { InputType, ObjectType, Field } from "type-graphql";

@ObjectType()
@InputType()
export class EventAttendance {
  @Field()
  id!: string

  @Field()
  user!: string

  @Field()
  event!: string
}
