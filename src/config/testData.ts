import { getRepository } from "typeorm";
import * as faker from 'faker'
import { Event, EventProps } from "../modules/events/domain/Event";

export function configureTestData() {
  createEvent()
}

async function createEvent() {
  const { identifiers } = await getRepository(Event).insert({
    name: faker.lorem.words(4)
  })

  console.log('Created event', identifiers)

  return identifiers
}