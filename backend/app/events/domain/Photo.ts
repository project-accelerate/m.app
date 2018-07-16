import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Photo {
  @Field() id!: string
}
