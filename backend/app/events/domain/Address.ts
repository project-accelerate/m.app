import { ObjectType, Field, InputType } from 'type-graphql'
import { GraphQLString, GraphQLInt } from 'graphql'
import { Point } from 'geojson'
import { Without } from '../../common/WithoutId'

@ObjectType()
export class Address {
  static create(props: Address) {
    return Object.assign(new Address(), props)
  }

  @Field({ nullable: true }) streetAddress?: string

  @Field({ nullable: true }) city?: string

  @Field({ nullable: true }) postcode?: string

  location?: Point
}

@InputType()
export class AddressInput implements Without<Address, 'location'> {
  @Field({ nullable: true }) streetAddress?: string

  @Field({ nullable: true }) city?: string

  @Field({ nullable: true }) postcode?: string
}
