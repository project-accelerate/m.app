import { ObjectType, Field, InputType } from 'type-graphql'
import { Photo } from './Photo'

@InputType()
export class CreateOrganiserRequest {
  @Field() name!: string

  @Field({ nullable: true })
  bio?: string

  @Field({ nullable: true })
  photoData?: string
}

@ObjectType()
export class Organiser {
  @Field() id!: string

  @Field() name!: string

  @Field() bio?: string

  @Field(() => Photo)
  photo?: string
}
