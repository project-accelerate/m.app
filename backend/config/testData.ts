import * as log from 'winston'
import * as faker from 'faker'
import { times, random } from 'lodash'
import { endOfTomorrow, subHours, addDays, addHours } from 'date-fns'
import { someGeoPoint } from '../../common/test/testUtils'
import { givenThatAnEventExists } from '../app/events/test/eventTestUtils'

export async function configureTestData() {
  await Promise.all(times(20, testEvent))
}

async function testEvent(i: number) {
  // Location for OX49 test endcode
  const location = someGeoPoint(-1.06986930435083, 51.656143706615)

  const startTime = addHours('2018-09-22', random(0, 24 * 4))

  const props = {
    startTime,
    endTime: addHours(startTime, random(1, 3)),
    introduction: faker.lorem.paragraph(3),
    name: faker.lorem.words(2),
    location,
  }

  const id = await givenThatAnEventExists(props)
  log.info('created test event', id, props)
}
