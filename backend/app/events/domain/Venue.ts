import { ObjectType, Field, InputType } from 'type-graphql'
import { FileUpload, GraphQLUpload } from 'apollo-upload-server'
import { AddressInput } from './Address'
import { Point } from 'geojson'

@InputType()
export class CreateVenueRequest {
  @Field() name!: string

  @Field() description!: string

  @Field(() => GraphQLUpload, { nullable: true })
  photoUpload?: FileUpload

  @Field() address!: AddressInput

  importRef?: string
}

@ObjectType()
export class Venue {
  @Field() id!: string

  @Field() name!: string

  @Field() description!: string

  photo?: string
  streetAddress!: string
  city!: string
  postcode!: string
  location!: Point

  importRef?: string
}
