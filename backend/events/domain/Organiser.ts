import { ObjectType, Field } from "type-graphql";

export interface OrganiserProps {
  name: string
}

@ObjectType()
export class Organiser implements OrganiserProps {
  @Field()
  id!: string

  @Field()
  name!: string
}
