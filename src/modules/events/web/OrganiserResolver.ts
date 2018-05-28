import { ObjectType, Field, Query, Resolver, Mutation, InputType, Arg, GraphQLISODateTime }  from 'type-graphql'
import { MutationRequest } from '../../../common/resolverUtils';
import { OrganiserRepository } from '../external/OrganiserRepository';
import { OrganiserProps, Organiser } from '../domain/Organiser';

@Resolver(Organiser)
export class OrganiserResolver {
  constructor(
    public organiserRepository: OrganiserRepository
  ) { }

  @Query(() => Organiser, {
    nullable: true,
    description: "Get an organiser by id"
  })
  organiser(@Arg("id") id: string) {
    return this.organiserRepository.findOne(id)
  }
}
