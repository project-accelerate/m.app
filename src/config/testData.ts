import * as log from 'winston'
import * as faker from 'faker'
import { times } from 'lodash';
import { Event, EventProps } from "../modules/events/domain/Event";
import { EventRepository } from "../modules/events/external/EventRepository";
import { someEvent, givenThatAnEventExists, someEventProps } from '../modules/events/test/eventTestUtils';
import { startOfTomorrow, endOfTomorrow, subHours, addDays, addHours } from 'date-fns';
import { someGeoPoint } from '../test/testUtils';

export async function configureTestData() {
  await Promise.all(times(20, testEvent))
}

async function testEvent(i: number) {
  // Location for OX49 test endcode
  const location = someGeoPoint(-1.06986930435083, 51.656143706615)

  const startTime = addDays(
    subHours(endOfTomorrow(), 5),
    i
  )

  const props = {
    startTime,
    endTime: addHours(startTime, 3),
    introduction: faker.lorem.paragraph(3),
    name: faker.lorem.words(2),
    location
  }

  const id = await givenThatAnEventExists(props)
  log.info('created test event', id, props)
}
