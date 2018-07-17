import { Resolver, FieldResolver, Root } from 'type-graphql'
import { User } from 'backend/app/user/domain/User'
import { UserRepository } from 'backend/app/user/external/UserRepository'
import { ConferenceAttendance } from '../domain/ConferenceAttendance'

@Resolver(() => ConferenceAttendance)
export class ConferenceAttendanceResolver {
  constructor(private userRepository: UserRepository) {}

  @FieldResolver(() => User)
  attendee(@Root() conferenceAttendance: ConferenceAttendance): Promise<User> {
    return this.userRepository.findOneRequired({
      id: conferenceAttendance.attendee,
    })
  }
}
