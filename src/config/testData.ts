import * as faker from 'faker'
import { Event, EventProps } from "../modules/events/domain/Event";
import { EventRepository } from "../modules/events/external/EventRepository";

const event = new EventRepository()

export function configureTestData() {
  createEvent()
}

async function createEvent() {
  const id = await event.insert({
    name: faker.lorem.words(4)
  })

  console.log('Created event', id)

  return id
}
