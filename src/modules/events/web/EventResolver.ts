import { ObjectType, Field, Query, Resolver, Mutation, InputType, Arg, GraphQLISODateTime, FieldResolver, Root, Args, ArgsType }  from 'type-graphql'
import { Inject } from 'typedi';
import { MutationRequest } from '../../../common/resolverUtils';
import { Event, EventProps } from '../domain/Event';
import { Venue } from '../domain/Venue';
import { EventRepository } from '../external/EventRepository';
import { Organiser } from '../domain/Organiser';
import { OrganiserRepository } from '../external/OrganiserRepository';
import { VenueRepository } from '../external/VenueRepository';
import { EventFeedService } from '../application/EventFeedService';

@ArgsType()
export class EventFeedArgs {
  @Field()
  radiusInMiles!: number

  @Field()
  postcode!: string
}

@Resolver(() => Event)
export class EventResolver {
  constructor(
    private eventFeedService: EventFeedService,
    private eventRepository: EventRepository,
    private organiserRepository: OrganiserRepository,
    private venueRepository: VenueRepository,
  ) { }

  @Query(() => Event, {
    nullable: true,
    description: "Get an event by id"
  })
  event(@Arg("id") id: string) {
    return this.eventRepository.findOne(id)
  }

  @Query(() => [Event], {
    description: "Get feed of upcoming events for a given locaton"
  })
  eventFeed(@Args() args: EventFeedArgs) {
    return this.eventFeedService.eventFeed({
      ...args,
      months: 3
    })
  }

  @FieldResolver(() => Organiser, {
    description: "Return the event organiser"
  })
  organiser(@Root() event: Event) {
    return this.organiserRepository.findOne(event.organiser)
  }

  @FieldResolver(() => Venue, {
    description: "Return the event venue"
  })
  venue(@Root() event: Event) {
    return this.venueRepository.findOne(event.venue)
  }
}
