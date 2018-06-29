import { InputType, Resolver, Mutation, Authorized } from 'type-graphql'
import { MutationRequest } from '../../common/resolverUtils'
import { Organiser, CreateOrganiserRequest } from '../domain/Organiser'
import { OrganiserAdminService } from '../application/OrganiserAdminService'
import { OrganiserRepository } from '../external/OrganiserRepository'
import { Role } from '../../../common/domain/Role'

@Resolver()
export class OrganiserMutations {
  constructor(
    private organiserAdminService: OrganiserAdminService,
    private organiserRepository: OrganiserRepository,
  ) {}

  @Authorized(Role.ADMIN)
  @Mutation(() => Organiser)
  async createOrganiser(
    @MutationRequest(() => CreateOrganiserRequest)
    request: CreateOrganiserRequest,
  ) {
    return this.organiserAdminService.addOrganiser(request)
  }
}
