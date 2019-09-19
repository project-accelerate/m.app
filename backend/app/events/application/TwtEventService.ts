import { Service } from 'typedi'
import { Event } from '../domain/Event'
import {
  TwtApiClient,
  TwtEvent,
  TwtEventSpeaker,
  TwtEventVenue,
} from '../external/TwtApiClient'
import { addMinutes, addHours } from 'date-fns'
import { decodeMilitaryTime, required } from 'backend/app/common/timeutil'
import { EventFamily } from 'common/domain/EventFamily'
import { Person } from '../domain/Person'
import { Venue } from '../domain/Venue'
import { PostcodesIOClient } from '../external/PostcodesIOClient'
import { RepositoryCache } from 'backend/app/common/RepositoryCache'

@Service()
export class TwtEventService {
  private cache = new RepositoryCache({ ttl: 1_000_000 })

  constructor(private client: TwtApiClient, private postcodes: PostcodesIOClient) {}

  async allEvents(filter: (x: Event) => boolean = () => true): Promise<Event[]> {
    return this.client
      .findAllEvents('2019')
      .then(events => events.map(this.toEvent).filter(filter))
  }

  async getEvent(id: string): Promise<Event> {
    return this.client.findOneEvent('2019', id).then(this.toEvent)
  }

  async getEventSpeakers(id: string): Promise<Person[]> {
    return this.client
      .findOneEvent('2019', id)
      .then(event => event ? event.speakers.map(this.toSpeaker) : [])
  }

  async getSpeaker(id: string): Promise<Person> {
    return this.client.findOneSpeaker('2019', id).then(this.toSpeaker)
  }

  async getEventsForSpeaker(id: string): Promise<Event[]> {
    return this.client
      .findAllEventsForSpeaker('2019', id)
      .then(events => events.map(this.toEvent))
  }

  async getVenue(id: string): Promise<Venue> {
    return this.client.findOneVenue('2019', id).then(this.toVenue)
  }

  private toSpeaker = (twtSpeaker: TwtEventSpeaker): Person => twtSpeaker && ({
    id: twtSpeaker.id,
    name: twtSpeaker.name,
    twitterHandle: twtSpeaker.twitter,
    bio: twtSpeaker.bio,
  })

  private toVenue = async (twtVenue: TwtEventVenue): Promise<Venue> => twtVenue && ({
    id: twtVenue.id,
    name: twtVenue.name,
    city: twtVenue.city,
    streetAddress: twtVenue.address,
    postcode: twtVenue.postcode,
    description: twtVenue.description || '',
    location: !(twtVenue.location || twtVenue.postcode) ? undefined : {
      type: 'Point',
      coordinates: twtVenue.location || await this.cache.resolve('postcode', { postcode: twtVenue.postcode }, async () => {
        const { longitude, latitude } = await this.postcodes.getPostcode(twtVenue.postcode!)
        return [longitude, latitude]
      }),
    },
  })

  private toEvent = (twtEvent: TwtEvent): Event  => {
    if (!twtEvent) {
      return undefined as any
    }

    const [h, m] = decodeMilitaryTime(twtEvent.startTime)

    // HACK: because I'm too tired to handle timezones properly
    const startTime = addHours(addMinutes(twtEvent.date, m), h - 1)
    const endTime = addMinutes(startTime, twtEvent.durationInMinutes)

    return {
      id: twtEvent.id,
      name: twtEvent.name,
      cancelled: false,
      detail: twtEvent.description,
      introduction: twtEvent.description.split('\n')[0].trim(),
      startTime,
      endTime,
      family: EventFamily.TWT,
      location: {
        type: 'Point',
        coordinates: twtEvent.venue.location!,
      },
      venue: twtEvent.venue.id,
      photo: twtEvent.image && twtEvent.image.imageUrl,
    }
  }
}
