import { VenueRepository } from "../db/VenueRepository";
import { VenueProps } from "../domain/Venue";

export class VenueAdminService {
  constructor(
    private readonly venueRepository: VenueRepository
  ) { }
  
  addVenue(props: VenueProps) {
    return this.venueRepository.insert(props)
  }
}
