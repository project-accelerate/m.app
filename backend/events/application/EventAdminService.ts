import { Service } from 'typedi'
import { EventRepository } from '../external/EventRepository'
import { CreateEventRequest } from '../domain/Event'
import { PhotoStorageService } from './PhotoStorageService'
import { VenueRepository } from '../external/VenueRepository'

@Service()
export class EventAdminService {
  constructor(
    private eventRepository: EventRepository,
    private venueRepository: VenueRepository,
    private photoStorageService: PhotoStorageService,
  ) {}

  async submitEvent({
    speakers,
    photoUpload,
    venue: venueId,
    ...props
  }: CreateEventRequest) {
    const [photoId, venue] = await Promise.all([
      PhotoStorageService.saveUploadedPhoto(
        this.photoStorageService,
        photoUpload,
      ),
      this.venueRepository.findOneRequired(venueId),
    ])

    const event = await this.eventRepository.insert({
      ...props,
      venue: venueId,
      photo: photoId,
      location: venue.location,
    })

    await this.eventRepository.speakers.add(event.id, speakers)

    return event
  }
}
