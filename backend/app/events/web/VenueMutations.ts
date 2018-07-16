import { InputType, Resolver, Mutation, Authorized } from 'type-graphql'
import { MutationRequest } from '../../common/resolverUtils'
import { Venue, CreateVenueRequest } from '../domain/Venue'
import { VenueAdminService } from '../application/VenueAdminService'
import { VenueRepository } from '../external/VenueRepository'
import { Role } from 'common/domain/Role'

@Resolver()
export class VenueMutations {
  constructor(
    private venueAdminService: VenueAdminService,
    private venueRepository: VenueRepository,
  ) {}

  @Authorized(Role.ADMIN)
  @Mutation(() => Venue)
  async createVenue(
    @MutationRequest(() => CreateVenueRequest)
    request: CreateVenueRequest,
  ) {
    return this.venueAdminService.addVenue(request)
  }
}
