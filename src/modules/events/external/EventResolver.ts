import { ObjectType, Field, Query, Resolver, Mutation, InputType, Arg, GraphQLISODateTime }  from 'type-graphql'
import { Event, EventProps } from '../domain/Event';
import { EventRepository } from '../db/EventRepository';
import { MutationRequest } from '../../../common/resolverUtils';
import { Inject } from 'typedi';

@InputType({
  description: "Request properties to submit a new event"
})
class CreateEventRequest implements EventProps {
  @Field()
  name!: string

  @Field()
  organiser!: string

  @Field()
  venue!: string

  @Field(() => GraphQLISODateTime)
  startTime!: Date

  @Field(() => GraphQLISODateTime)
  endTime!: Date

  @Field()
  introduction!: string
}

@Resolver(Event)
export class EventResolver {
  @Inject()
  eventRepository!: EventRepository

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
    const id = await this.eventRepository.insert(request)
    return this.eventRepository.findOne(id)
  }
}
