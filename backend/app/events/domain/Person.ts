import { FileUpload, GraphQLUpload } from 'apollo-upload-server'
import { ObjectType, Field, InputType } from 'type-graphql'

@InputType()
export class CreatePersonRequest {
  @Field() name!: string

  @Field({ nullable: true })
  bio?: string

  @Field({ nullable: true })
  twitterHandle?: string

  @Field(() => GraphQLUpload, { nullable: true })
  photoUpload?: FileUpload

  importRef?: string
}

@InputType()
export class EditPersonRequest {
  @Field() id!: string
  @Field() name!: string

  @Field({ nullable: true })
  bio?: string

  @Field({ nullable: true })
  twitterHandle?: string

  @Field(() => GraphQLUpload, { nullable: true })
  photoUpload?: FileUpload
}



@ObjectType()
export class Person {
  @Field() id!: string

  @Field() name!: string

  @Field({ nullable: true })
  bio?: string

  photo?: string

  @Field({ nullable: true })
  twitterHandle?: string

  importRef?: string
}
