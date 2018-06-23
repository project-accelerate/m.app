import { InputType, Resolver, Mutation } from 'type-graphql'
import { MutationRequest } from 'backend/common/resolverUtils'
import {
  Organiser,
  CreateOrganiserRequest,
} from 'backend/events/domain/Organiser'
import { OrganiserAdminService } from 'backend/events/application/OrganiserAdminService'
import { OrganiserRepository } from 'backend/events/external/OrganiserRepository'

@Resolver()
export class OrganiserMutations {
  constructor(
    private organiserAdminService: OrganiserAdminService,
    private organiserRepository: OrganiserRepository,
  ) {}

  @Mutation(() => Organiser)
  async createOrganiser(
    @MutationRequest(() => CreateOrganiserRequest)
    request: CreateOrganiserRequest,
  ) {
    const id = await this.organiserAdminService.addOrganiser(request)
    return this.organiserRepository.findOne(id)
  }
}
