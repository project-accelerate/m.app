import {
  Field,
  Query,
  Resolver,
  Arg,
  FieldResolver,
  Root,
  Args,
  ArgsType,
  registerEnumType,
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
import { EventFamily } from '../../../../node_modules/common/domain/EventFamily'

const AllEventsConnection = createSimpleConnection({
  type: Event,
  name: 'AllEvents',
})

const AllMeetupEventsConnection = createSimpleConnection({
  type: Event,
  name: 'AllMeetupEvents',
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
  ) {}

  @Query(() => AllEventsConnection)
  async allEvents() {
    return new AllEventsConnection(await this.eventRepository.findAll())
  }

  @Query(() => Event, {
    nullable: true,
    description: 'Get an event by id',
  })
  event(@Arg('id') id: string) {
    return this.eventRepository.findOne({ id })
  }

  @Query(() => [Event], {
    nullable: true,
    description: 'Get all events of a family',
  })
  eventsByFamily(
    @Arg('family', type => EventFamily)
    family: EventFamily,
  ) {
    return this.eventRepository.find({ family })
  }

  @Query(() => AllMeetupEventsConnection)
  async meetupEvents() {
    return new AllMeetupEventsConnection(
      await this.eventRepository.find({ family: EventFamily.TWT_MEETUP_2018 }),
    )
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
    return new EventSpeakersConnection(
      await this.eventRepository.speakers.findFrom(event.id),
    )
  }

  @FieldResolver(() => Venue, {
    description: 'Return the event venue',
  })
  venue(@Root() event: Event) {
    return this.venueRepository.findOne({ id: event.venue })
  }

  @FieldResolver(() => Photo, { nullable: true })
  photo(@Root() event: Event) {
    return this.photoStorageService.getPhoto(event.photo)
  }
}
