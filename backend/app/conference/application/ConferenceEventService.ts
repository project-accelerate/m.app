import { Service } from 'typedi'
import { EventRepository } from 'backend/app/events/external/EventRepository'
import { User } from 'backend/app/user/domain/User'
import { EventFamily } from 'common/domain/EventFamily'
import { oneOf } from 'backend/app/common/CrudRepository'

@Service()
export class ConferenceEventService {
  constructor(private eventRepository: EventRepository) {}

  relevantEvents(user: User) {
    return this.eventRepository.find({
      family: oneOf(...this.relevantFamilies(user)),
    })
  }

  relevantVotes(user: User) {
    if (!user.isDelegate) {
      return []
    }

    return this.eventRepository.find({
      family: EventFamily.LABOUR_2018_VOTE,
    })
  }

  private relevantFamilies(user: User) {
    if (user.isDelegate) {
      return [EventFamily.LABOUR_2018, EventFamily.TWT_2018]
    }

    return [EventFamily.TWT_2018]
  }
}
