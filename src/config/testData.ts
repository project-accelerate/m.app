import * as faker from 'faker'
import { Event, EventProps } from "../modules/events/domain/Event";
import { EventRepository } from "../modules/events/db/EventRepository";

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
