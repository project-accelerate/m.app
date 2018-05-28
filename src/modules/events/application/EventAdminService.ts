import { PostcodesIOClient } from "../external/PostcodesIOClient";
import { EventRepository } from "../db/EventRepository";
import { OrganiserAdminService } from './OrganiserAdminService';
import { VenueAdminService } from './VenueAdminService';

interface EventSubmissionProps {
  name: string
  organiserName: string
  venueName: string
  startTime: Date
  endTime: Date
  introduction: string
  postcode: string
}

export class EventAdminService {
  constructor(
    private readonly postcodesClient: PostcodesIOClient,
    private readonly eventRepository: EventRepository,
    private readonly organiserAdmin: OrganiserAdminService,
    private readonly venueAdmin: VenueAdminService,
  ) { }

  async submitEvent(props: EventSubmissionProps) {
    const { organiserName, venueName, postcode, ...eventProps } = props

    const [
      { longitude, latitude },
      organiser,
      venue
    ] = await Promise.all([
      this.postcodesClient.getPostcode(postcode),
      this.organiserAdmin.addOrganiser({
        name: organiserName
      }),
      this.venueAdmin.addVenue({
        name: venueName,
        postcode
      })
    ])

    return this.eventRepository.insert({
      ...eventProps,
      organiser,
      venue,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    })
  }
}