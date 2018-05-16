import { Repository, AbstractRepository, EntityRepository } from "typeorm";
import { Event, EventProps } from "../domain/Event";

@EntityRepository(Event)
export class EventRepository extends AbstractRepository<Event> {
  findOne(id: string): Promise<Event | undefined> {
    return this.manager.findOne(Event, { id })
  }

  async insert(data: EventProps): Promise<string> {
    const { identifiers } = await this.manager.insert(Event, data)
    return identifiers[0].id as string
  }
}
