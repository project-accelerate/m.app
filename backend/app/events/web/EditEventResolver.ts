import {
  Resolver,
  Field,
  Mutation,
  GraphQLISODateTime,
  InputType,
  Authorized,
} from 'type-graphql'
import { MutationRequest } from 'backend/app/common/resolverUtils'
import { EventAdminService } from 'backend/app/events/application/EventAdminService'
import { EventRepository } from 'backend/app/events/external/EventRepository'
import { Event, EditEventRequest } from 'backend/app/events/domain/Event'
import { Role } from 'common/domain/Role'

@Resolver()
class EditEventResolver {
  constructor(
    private eventAdminService: EventAdminService,
    private eventRepository: EventRepository,
  ) {}

  @Authorized(Role.ADMIN)
  @Mutation(() => Event, {
    description: 'Edit an event',
  })
  async editEvent(
    @MutationRequest(() => EditEventRequest)
    request: EditEventRequest,
  ) {
    console.log("EDITING EVENT")
    return this.eventAdminService.editEvent(request)
  }
}
