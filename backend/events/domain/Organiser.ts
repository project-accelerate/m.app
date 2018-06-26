import { FileUpload, GraphQLUpload } from 'apollo-upload-server'
import { ObjectType, Field, InputType } from 'type-graphql'
import { Photo } from './Photo'

@InputType()
export class CreateOrganiserRequest {
  @Field() name!: string

  @Field({ nullable: true })
  bio?: string

  @Field(() => GraphQLUpload, { nullable: true })
  photoUpload?: FileUpload
}

@ObjectType()
export class Organiser {
  @Field() id!: string

  @Field() name!: string

  @Field() bio?: string

  photo?: string
}
