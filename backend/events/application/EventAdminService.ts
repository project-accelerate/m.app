import { Service } from 'typedi'
import { PostcodesIOClient } from '../external/PostcodesIOClient'
import { EventRepository } from '../external/EventRepository'
import { OrganiserAdminService } from './OrganiserAdminService'
import { VenueAdminService } from './VenueAdminService'
import { CreateEventRequest } from 'backend/events/domain/Event'

@Service()
export class EventAdminService {
  constructor(
    private readonly postcodesClient: PostcodesIOClient,
    private readonly eventRepository: EventRepository,
    private readonly organiserAdmin: OrganiserAdminService,
    private readonly venueAdmin: VenueAdminService,
  ) {}

  async submitEvent(request: CreateEventRequest) {
    const { organiserName, venueName, postcode, ...eventProps } = request

    const [{ longitude, latitude }, organiser, venue] = await Promise.all([
      this.postcodesClient.getPostcode(postcode),
      this.organiserAdmin.addOrganiser({
        name: organiserName,
      }),
      this.venueAdmin.addVenue({
        name: venueName,
        postcode,
      }),
    ])

    return this.eventRepository.insert({
      ...eventProps,
      organiser,
      venue,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    })
  }
}
