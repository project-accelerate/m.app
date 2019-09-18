import {
  Field,
  Query,
  Resolver,
  Arg,
  FieldResolver,
  Root,
  Args,
  ArgsType,
} from 'type-graphql'
import { Event } from '../domain/Event'
import { Venue } from '../domain/Venue'
import { EventRepository } from '../external/EventRepository'
import { Person } from '../domain/Person'
import { VenueRepository } from '../external/VenueRepository'
import { EventFeedService } from '../application/EventFeedService'
import { Photo } from '../domain/Photo'
import { PhotoStorageService } from '../application/PhotoStorageService'
import { createSimpleConnection } from '../../common/Connection'
import { TwtEventService } from '../application/TwtEventService'

const AllEventsConnection = createSimpleConnection({
  type: Event,
  name: 'AllEvents',
})

const EventSpeakersConnection = createSimpleConnection({
  type: Person,
  name: 'EventSpeakersConnection',
})

@ArgsType()
export class EventFeedArgs {
  @Field() radiusInMiles!: number

  @Field() postcode!: string
}

@Resolver(() => Event)
export class EventResolver {
  constructor(
    private eventFeedService: EventFeedService,
    private eventRepository: EventRepository,
    private venueRepository: VenueRepository,
    private photoStorageService: PhotoStorageService,
    private twt: TwtEventService,
  ) {}

  @Query(() => AllEventsConnection)
  async allEvents() {
    return new AllEventsConnection([
      ...(await this.twt.allEvents()),
      ...(await this.eventRepository.findAll()),
    ])
  }

  @Query(() => Event, {
    nullable: true,
    description: 'Get an event by id',
  })
  async event(@Arg('id') id: string) {
    return (
      (await this.twt.getEvent(id)) ||
      (await this.eventRepository.findOne({ id }))
    )
  }

  @Query(() => [Event], {
    description: 'Get events a person speaks at',
  })
  async eventsForSpeaker(@Arg('person') person: string) {
    return [
      ...(await this.eventRepository.findEventsbySpeaker(person)),
      ...(await this.twt.getEventsForSpeaker(person)),
    ]
  }

  @Query(() => [Event], {
    description: 'Get feed of upcoming events for a given locaton',
  })
  eventFeed(@Args() args: EventFeedArgs) {
    return this.eventFeedService.eventFeed({
      ...args,
      months: 3,
    })
  }

  @FieldResolver(() => EventSpeakersConnection)
  async speakers(@Root() event: Event) {
    return new EventSpeakersConnection([
      ...(await this.eventRepository.speakers.findFrom(event.id)) || [],
      ...(await this.twt.getEventSpeakers(event.id)) || [],
    ])
  }

  @FieldResolver(() => Venue, {
    description: 'Return the event venue',
  })
  async venue(@Root() event: Event) {
    return (
      (await this.twt.getVenue(event.venue)) ||
      (await this.venueRepository.findOne({ id: event.venue }))
    )
  }

  @FieldResolver(() => Photo, { nullable: true })
  photo(@Root() event: Event) {
    return this.photoStorageService.getPhoto(event.photo)
  }
}
