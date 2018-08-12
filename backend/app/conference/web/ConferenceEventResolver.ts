import { GraphQLBoolean } from 'graphql'
import { Resolver, FieldResolver, Root, Arg } from 'type-graphql'
import { Event } from 'backend/app/events/domain/Event'
import { EventAttendanceRepository } from '../external/EventAttedanceRepository'

@Resolver(() => Event)
export class ConferenceEventResolver {
  constructor(private eventAttendanceRepository: EventAttendanceRepository) {}

  @FieldResolver(() => GraphQLBoolean)
  async userIsAttending(@Root() event: Event, @Arg('userId') user: string) {
    return Boolean(
      await this.eventAttendanceRepository.findOne({
        user,
        event: event.id,
      }),
    )
  }
}
