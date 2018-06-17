import { Service } from 'typedi'
import { VenueRepository } from '../external/VenueRepository'
import { VenueProps } from '../domain/Venue'

@Service()
export class VenueAdminService {
  constructor(private readonly venueRepository: VenueRepository) {}

  addVenue(props: VenueProps) {
    return this.venueRepository.insert(props)
  }
}
