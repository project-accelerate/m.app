import { ObjectType, Field, Query, Resolver, Mutation, InputType, Arg, GraphQLISODateTime }  from 'type-graphql'
import { MutationRequest } from '../../../common/resolverUtils';
import { VenueRepository } from '../external/VenueRepository';
import { VenueProps, Venue } from '../domain/Venue';

@Resolver(Venue)
export class VenueResolver {
  constructor(
    public venueRepository: VenueRepository,
  ) { }

  @Query(() => Venue, {
    nullable: true,
    description: "Get a venue by id"
  })
  venue(@Arg("id") id: string) {
    return this.venueRepository.findOne(id)
  }
}
