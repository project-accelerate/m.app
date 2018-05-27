import { Event, EventProps } from "../domain/Event";
import { CrudRepository, CrudRepositoryConfig } from "../../../common/CrudRepository";

const config: CrudRepositoryConfig<Event> = {
  tableName: 'event'
}

export class EventRepository extends CrudRepository<Event, EventProps>(config) {
}
