import { Resolver, Root, FieldResolver, Arg } from 'type-graphql'
import { User } from 'backend/app/user/domain/User'
import { EventRepository } from 'backend/app/events/external/EventRepository'
import { EventFamily } from 'common/domain/EventFamily'
import { createSimpleConnection } from 'backend/app/common/Connection'
import { Event } from 'backend/app/events/domain/Event'
import { ConferenceAttendanceRepository } from '../external/ConferenceAttendanceRepository'
import { oneOf } from 'backend/app/common/CrudRepository'
import { EventAttendanceRepository } from 'backend/app/conference/external/EventAttedanceRepository'

const UserConferenceEventsConnection = createSimpleConnection({
  name: 'UserEventsConnection',
  type: Event,
})

@Resolver(() => User)
export class UserConferencesResolver {
  constructor(
    private eventRepository: EventRepository,
    private conferenceAttendanceRepository: ConferenceAttendanceRepository,
    private eventAttendanceReposity: EventAttendanceRepository,
  ) {}

  @FieldResolver(() => UserConferenceEventsConnection)
  async conferenceEvents(@Root() user: User) {
    const attendances = await this.conferenceAttendanceRepository.find({
      attendee: user.id,
    })

    return new UserConferenceEventsConnection(
      await this.eventRepository.find({
        family: oneOf(...attendances.map(a => a.conference)),
      }),
    )
  }

  @FieldResolver(() => [EventFamily])
  async conferences(@Root() user: User) {
    const attendances = await this.conferenceAttendanceRepository.find({
      attendee: user.id,
    })

    return attendances.map(attendance => attendance.conference)
  }

  @FieldResolver(() => [Event])
  async eventsAttending(@Root() user: User) {
    const attendances = await this.eventAttendanceReposity.find({
      user: user.id,
    })

    return this.eventRepository.find({
      id: oneOf(...attendances.map(a => a.event)),
    })
  }
}
