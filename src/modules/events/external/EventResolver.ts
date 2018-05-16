import { ObjectType, Field, Query, Resolver, Mutation, InputType, Arg }  from 'type-graphql'
import { Event, EventProps } from '../domain/Event';
import { getCustomRepository } from 'typeorm';
import { EventRepository } from '../db/EventRepository';
import { MutationRequest } from '../../../common/resolverUtils';

@InputType({
  description: "Request properties to submit a new event"
})
class CreateEventRequest implements EventProps {
  @Field()
  name!: string
}

@Resolver(() => Event)
export class EventResolver {
  get eventRepository() {
    return getCustomRepository(EventRepository)
  }

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
