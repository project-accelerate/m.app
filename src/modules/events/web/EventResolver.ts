import { ObjectType, Field, Query, Resolver, Mutation, InputType, Arg, GraphQLISODateTime, FieldResolver, Root }  from 'type-graphql'
import { Inject } from 'typedi';
import { MutationRequest } from '../../../common/resolverUtils';
import { Event, EventProps } from '../domain/Event';
import { Venue } from '../domain/Venue';
import { EventRepository } from '../external/EventRepository';
import { Organiser } from '../domain/Organiser';
import { OrganiserRepository } from '../external/OrganiserRepository';
import { VenueRepository } from '../external/VenueRepository';
import { EventAdminService } from '../application/EventAdminService';

@InputType({
  description: "Request properties to submit a new event"
})
class CreateEventRequest {
  @Field()
  name!: string

  @Field()
  organiserName!: string

  @Field()
  venueName!: string

  @Field(() => GraphQLISODateTime)
  startTime!: Date

  @Field(() => GraphQLISODateTime)
  endTime!: Date

  @Field()
  introduction!: string

  @Field()
  postcode!: string
}

@Resolver(() => Event)
export class EventResolver {
  constructor(
    public eventAdminService: EventAdminService,
    public eventRepository: EventRepository,
    public organiserRepository: OrganiserRepository,
    public venueRepository: VenueRepository,
  ) { }

  @Query(() => Event, {
    nullable: true,
    description: "Get an event by id"
  })
  event(@Arg("id") id: string) {
    return this.eventRepository.findOne(id)
  }

  @Mutation(() => Event, {
    description: "Submit a new event"
  })
  async createEvent(@MutationRequest(() => CreateEventRequest) request: CreateEventRequest) {
    const id = await this.eventAdminService.submitEvent(request)
    return this.eventRepository.findOne(id)
  }

  @FieldResolver(() => Organiser)
  organiser(@Root() event: Event) {
    return this.organiserRepository.findOne(event.organiser)
  }

  @FieldResolver(() => Venue)
  venue(@Root() event: Event) {
    return this.venueRepository.findOne(event.venue)
  }
}
