import { Service } from 'typedi'
import { EventRepository } from '../external/EventRepository'
import { CreateEventRequest, Event, EditEventRequest } from '../domain/Event'
import { PhotoStorageService } from './PhotoStorageService'
import { VenueRepository } from '../external/VenueRepository'
import { PushNotificationService } from 'backend/app/device/application/PushNotificationService'
import { EventAttendanceRepository } from 'backend/app/conference/external/EventAttedanceRepository'
import { DeviceRepository } from 'backend/app/device/external/DeviceRepository'
import { oneOf } from 'backend/app/common/CrudRepository'
import { format } from 'date-fns'
import {
  PushNotificationRequest,
  PushNotificationPayload,
} from 'backend/app/device/domain/PushNotificationRequest'
import { Without } from 'backend/app/common/WithoutId'

@Service()
export class EventAdminService {
  constructor(
    private eventRepository: EventRepository,
    private eventAttendanceRepository: EventAttendanceRepository,
    private venueRepository: VenueRepository,
    private photoStorageService: PhotoStorageService,
    private pushNotificationService: PushNotificationService,
    private deviceRepository: DeviceRepository,
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

  async editEvent({
    id,
    speakers,
    photoUpload,
    venue: venueId,
    ...props
  }: EditEventRequest) {
    const [photoId, venue] = await Promise.all([
      photoUpload
        ? PhotoStorageService.saveUploadedPhoto(
            this.photoStorageService,
            photoUpload,
          )
        : Promise.resolve(undefined),
      venueId
        ? this.venueRepository.findOneRequired({ id: venueId })
        : Promise.resolve(undefined),
    ])

    await this.eventRepository.update(id, {
      ...(photoId ? { photo: photoId } : {}),
      ...(venueId ? { venue: venueId } : {}),
      ...(venueId ? { venue: venueId } : {}),
      ...(venue ? { location: venue.location } : {}),
      ...props,
    })

    if (speakers) {
      await this.eventRepository.speakers.add(id, <string[]>speakers)
    }

    return true
  }

  async cancelEvent(id: string) {
    const event = await this.eventRepository.findOneRequired({ id })
    await this.eventRepository.update(id, {
      cancelled: true,
    })

    this.sendNotificationToEventAttendees(id, {
      title: 'Event Cancelled',
      body: `${event.name} has been cancelled`,
    })
  }

  private async updateImportedEvent(
    { id, ...existingProps }: Event,
    { speakers, photoUpload, ...updatedProps }: CreateEventRequest,
  ): Promise<Event> {
    const venue = await this.venueRepository.findOneRequired({
      id: updatedProps.venue,
    })
    const update = {
      ...existingProps,
      ...updatedProps,
      location: venue.location,
    }

    this.eventRepository.update(id, update)
    await this.eventRepository.speakers.replace(id, speakers)

    this.notifyAtendeesOfChange(id, update, existingProps)

    return { id, ...update }
  }

  private async sendNotificationToEventAttendees(
    eventId: string,
    req: Without<PushNotificationPayload, 'to'>,
  ) {
    const attendees = await this.eventAttendanceRepository.find({
      event: eventId,
    })

    const devices = await this.deviceRepository.find({
      owner: oneOf(...attendees.map(a => a.id)),
    })

    this.pushNotificationService.sendNotifications(
      devices.filter(d => d.deviceToken).map(d => ({
        deviceId: d.id,
        payload: {
          to: d.deviceToken!,
          ...req,
        },
      })),
    )
  }

  private async notifyAtendeesOfChange(
    eventId: string,
    newEvent: ChangeRelevance,
    existingEvent: ChangeRelevance,
  ) {
    if (
      newEvent.startTime === existingEvent.startTime &&
      newEvent.venue === existingEvent.venue
    ) {
      return
    }

    const venue = await this.venueRepository.findOneRequired({
      id: newEvent.venue,
    })

    this.sendNotificationToEventAttendees(eventId, {
      title: 'Event Updated',
      body: `${newEvent.name} will now be at ${venue.name} at ${format(
        newEvent.startTime,
        '',
      )}`,
    })
  }
}

type ChangeRelevance = Pick<Event, 'startTime' | 'venue' | 'name'>
