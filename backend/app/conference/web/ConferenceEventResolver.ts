import { Resolver, Root, FieldResolver } from 'type-graphql'
import { User } from 'backend/app/user/domain/User'
import { EventRepository } from 'backend/app/events/external/EventRepository'
import { EventFamily } from 'common/domain/EventFamily'
import { createSimpleConnection } from 'backend/app/common/Connection'
import { Event } from 'backend/app/events/domain/Event'
import { ConferenceAttendanceRepository } from '../external/ConferenceAttendanceRepository'
import { oneOf } from 'backend/app/common/CrudRepository'

const UserConferenceEventsConnection = createSimpleConnection({
  name: 'UserEventsConnection',
  type: Event,
})

@Resolver(() => User)
export class UserConferencesResolver {
  constructor(
    private eventRepository: EventRepository,
    private conferenceAttendanceRepository: ConferenceAttendanceRepository,
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
}
