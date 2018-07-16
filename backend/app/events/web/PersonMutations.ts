import { InputType, Resolver, Mutation, Authorized } from 'type-graphql'
import { MutationRequest } from '../../common/resolverUtils'
import { Person, CreatePersonRequest } from '../domain/Person'
import { PersonAdminService } from '../application/PersonAdminService'
import { PersonRepository } from '../external/PersonRepository'
import { Role } from 'common/domain/Role'

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
    return this.personAdminService.addPerson(request)
  }
}
