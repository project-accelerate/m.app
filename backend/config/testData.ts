import * as log from 'winston'
import * as faker from 'faker'
import { times, random } from 'lodash'
import { endOfTomorrow, subHours, addDays, addHours } from 'date-fns'
import { someGeoPoint } from '../../common/test/testUtils'
import { givenThatAnEventExists, givenThatAPersonExists, givenThatAnEventAndSpeakerExists } from '../app/events/test/eventTestUtils'

export async function configureTestData() {
  var eventIDs = await Promise.all(times(5, testEventAndSpeaker))

  
}
async function testEventAndSpeaker()
{
  var eventProps = createTestEventProps()
  var personProps = createTestPersonProps()
  return await givenThatAnEventAndSpeakerExists(personProps,eventProps)
}

export function createTestPersonProps()
{
  const props = {
    name: faker.lorem.words(2),
    photo:"http://bucketeer_bucket_name.s3-test:4569/public/32ac9bd6-050f-4da1-9305-4ba58dcdd94a.jpeg"
  }
  return props
}

function createTestEventProps()
{
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

  return props;
}

async function testEvent() {
  // Location for OX49 test endcode
  var props = createTestEventProps()
  const id = await givenThatAnEventExists(props)
  log.info('created test event', id, props)

  return id;
}
