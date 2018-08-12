import {
  Resolver,
  ObjectType,
  Mutation,
  FieldResolver,
  Root,
  Arg,
} from 'type-graphql'
import { UserMutation } from 'backend/app/user/web/UserMutations'
import { EventAttendanceRepository } from 'backend/app/conference/external/EventAttedanceRepository'
import { User } from 'backend/app/user/domain/User'
import { UserRepository } from 'backend/app/user/external/UserRepository'

@Resolver(() => UserMutation)
export class EventAttendanceMutationResolver {
  constructor(
    private eventAttendanceRepository: EventAttendanceRepository,
    private userRepository: UserRepository,
  ) {}

  @FieldResolver(() => User)
  async attendEvent(@Root() user: UserMutation, @Arg('eventId') event: string) {
    await this.eventAttendanceRepository.insert({
      user: user.id,
      event,
    })

    return this.userRepository.findOneRequired(user)
  }

  @FieldResolver(() => User)
  async cancelAttendance(
    @Root() user: UserMutation,
    @Arg('eventId') event: string,
  ) {
    await this.eventAttendanceRepository.delete({
      user: user.id,
      event,
    })

    return this.userRepository.findOneRequired(user)
  }
}
