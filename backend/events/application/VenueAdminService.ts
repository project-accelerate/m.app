import { Service } from 'typedi'
import { VenueRepository } from '../external/VenueRepository'

interface AddVenueProps {
  name: string
  postcode: string
}

@Service()
export class VenueAdminService {
  constructor(private readonly venueRepository: VenueRepository) {}

  addVenue(props: AddVenueProps) {
    return this.venueRepository.insert(props)
  }
}
