import { Resolver, Root, FieldResolver } from 'type-graphql'
import { GraphQLFloat } from 'graphql'
import { Address } from '../domain/Address'

@Resolver(() => Address)
export class AddressResolver {
  @FieldResolver(() => GraphQLFloat)
  longitude(@Root() address: Address): number {
    return address.location.coordinates[0]
  }

  @FieldResolver(() => GraphQLFloat)
  latitude(@Root() address: Address): number {
    return address.location.coordinates[1]
  }
}
