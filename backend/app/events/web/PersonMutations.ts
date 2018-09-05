import { InputType, Resolver, Mutation, Authorized } from 'type-graphql'
import { MutationRequest } from '../../common/resolverUtils'
import { Person, CreatePersonRequest, EditPersonRequest } from '../domain/Person'
import { PersonAdminService } from '../application/PersonAdminService'
import { PersonRepository } from '../external/PersonRepository'
import { Role } from 'common/domain/Role'
import { GraphQLBoolean } from 'graphql';

@Resolver()
export class PersonMutations {
  constructor(
    private personAdminService: PersonAdminService,
    private personRepository: PersonRepository,
  ) {}

  @Authorized(Role.ADMIN)
  @Mutation(() => Person)
  async createPerson(
    @MutationRequest(() => CreatePersonRequest)
    request: CreatePersonRequest,
  ) {
    return this.personAdminService.addPerson({name:request.name,bio:request.bio,twitterHandle:request.twitterHandle,photoUpload:request.photoUpload})
  }

  @Authorized(Role.ADMIN)
  @Mutation(() => GraphQLBoolean, {
    description: 'Edit an event',
  })
  async editPerson(
    @MutationRequest(() => EditPersonRequest)
    request: EditPersonRequest,
  ) {
    this.personAdminService.editPerson(request)
    return true
  }
}
