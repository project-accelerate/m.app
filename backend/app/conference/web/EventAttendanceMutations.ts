import {
  Resolver,
  FieldResolver,
  Root,
  Arg,
  ObjectType,
  Field,
} from 'type-graphql'
import { UserMutation } from 'backend/app/user/web/UserMutations'
import { EventAttendanceRepository } from 'backend/app/conference/external/EventAttedanceRepository'
import { User } from 'backend/app/user/domain/User'
import { UserRepository } from 'backend/app/user/external/UserRepository'
import { EventRepository } from 'backend/app/events/external/EventRepository'
import { Event } from 'backend/app/events/domain/Event'

@ObjectType()
class EventAttendanceMutationResult {
  static create(props: EventAttendanceMutationResult) {
    return Object.assign(new EventAttendanceMutationResult(), props)
  }

  @Field() user!: User

  @Field() event!: Event
}

@Resolver(() => UserMutation)
export class EventAttendanceMutationResolver {
  constructor(
    private eventAttendanceRepository: EventAttendanceRepository,
    private userRepository: UserRepository,
    private eventRepository: EventRepository,
  ) {}

  @FieldResolver(() => EventAttendanceMutationResult)
  async attendEvent(@Root() user: UserMutation, @Arg('eventId') event: string) {
    await this.eventAttendanceRepository.insert({
      user: user.id,
      event,
    })

    return EventAttendanceMutationResult.create({
      user: await this.userRepository.findOneRequired({ id: user.id }),
      event: await this.eventRepository.findOneRequired({ id: event }),
    })
  }

  @FieldResolver(() => EventAttendanceMutationResult)
  async cancelAttendance(
    @Root() user: UserMutation,
    @Arg('eventId') event: string,
  ) {
    await this.eventAttendanceRepository.delete({
      user: user.id,
      event,
    })

    return EventAttendanceMutationResult.create({
      user: await this.userRepository.findOneRequired({ id: user.id }),
      event: await this.eventRepository.findOneRequired({ id: event }),
    })
  }
}
