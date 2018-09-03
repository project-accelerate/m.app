import { Resolver, Root, FieldResolver, Arg } from 'type-graphql'
import { User } from 'backend/app/user/domain/User'
import { EventRepository } from 'backend/app/events/external/EventRepository'
import { createSimpleConnection } from 'backend/app/common/Connection'
import { Event } from 'backend/app/events/domain/Event'
import { oneOf } from 'backend/app/common/CrudRepository'
import { EventAttendanceRepository } from 'backend/app/conference/external/EventAttedanceRepository'
import { ConferenceEventService } from 'backend/app/conference/application/ConferenceEventService'

const UserConferenceEventsConnection = createSimpleConnection({
  name: 'UserEventsConnection',
  type: Event,
})

@Resolver(() => User)
export class UserConferencesResolver {
  constructor(
    private eventRepository: EventRepository,
    private eventAttendanceReposity: EventAttendanceRepository,
    private conferenceEventService: ConferenceEventService,
  ) {}

  @FieldResolver(() => UserConferenceEventsConnection)
  async conferenceEvents(@Root() user: User) {
    return new UserConferenceEventsConnection(
      await this.conferenceEventService.relevantEvents(user),
    )
  }

  @FieldResolver(() => UserConferenceEventsConnection)
  async conferenceVotes(@Root() user: User) {
    return new UserConferenceEventsConnection(
      await this.conferenceEventService.relevantVotes(user),
    )
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
