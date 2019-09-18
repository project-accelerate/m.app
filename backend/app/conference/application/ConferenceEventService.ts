import { Service } from 'typedi'
import { EventRepository } from 'backend/app/events/external/EventRepository'
import { User } from 'backend/app/user/domain/User'
import { EventFamily } from 'common/domain/EventFamily'
import { oneOf } from 'backend/app/common/CrudRepository'
import { TwtEventService } from 'backend/app/events/application/TwtEventService'

@Service()
export class ConferenceEventService {
  constructor(private eventRepository: EventRepository, private twt: TwtEventService) {}

  async relevantEvents(user: User) {
    const relevantFamilies = this.relevantFamilies(user)

    return [
      ...await this.eventRepository.find({
        family: oneOf(...relevantFamilies),
      }),
      ...await this.twt.allEvents(e => relevantFamilies.includes(e.family))
    ]
  }

  relevantVotes(user: User) {
    if (!user.isDelegate) {
      return []
    }

    return this.eventRepository.find({
      family: EventFamily.VOTE,
    })
  }

  private relevantFamilies(user: User) {
    if (user.isDelegate) {
      return [EventFamily.TWT]
    }

    return [EventFamily.TWT]
  }
}
