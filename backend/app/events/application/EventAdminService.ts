import { Service } from 'typedi'
import { EventRepository } from '../external/EventRepository'
import { CreateEventRequest, Event, EditEventRequest } from '../domain/Event'
import { PhotoStorageService } from './PhotoStorageService'
import { VenueRepository } from '../external/VenueRepository'

@Service()
export class EventAdminService {
  constructor(
    private eventRepository: EventRepository,
    private venueRepository: VenueRepository,
    private photoStorageService: PhotoStorageService,
  ) {}

  async submitEvent(request: CreateEventRequest) {
    if (request.importRef) {
      const existingEvent = await this.eventRepository.findOne({
        importRef: request.importRef,
      })
      if (existingEvent) {
        return this.updateImportedEvent(existingEvent, request)
      }
    }

    const { speakers, photoUpload, venue: venueId, ...props } = request

    const [photoId, venue] = await Promise.all([
      PhotoStorageService.saveUploadedPhoto(
        this.photoStorageService,
        photoUpload,
      ),
      this.venueRepository.findOneRequired({ id: venueId }),
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

  async editEvent ({
    id,
    speakers,
    photoUpload,
    venue: venueId,
    ...props
  }: EditEventRequest) {
    const [photoId, venue] = await Promise.all([
      PhotoStorageService.saveUploadedPhoto(
        this.photoStorageService,
        photoUpload,
      ),
      this.venueRepository.findOneRequired({ id: venueId }),
    ])
    await this.eventRepository.update(id,{
      ...props,
      venue: venueId,
      photo: photoId,
      location: venue.location,
    })

    return true
  }
}
