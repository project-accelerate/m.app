import { someGeoPoint } from 'common/test/testUtils'
import { withDb } from '../../../test/integrationTestUtils'
import { shouldSupportStandardCrudFunctions } from '../../../test/CrudRepositoryTestUtils'
import {
  givenThatAPersonExists,
  givenThatAnEventExists,
} from '../../test/eventTestUtils'
import { Distance, DistanceUnit } from '../../domain/Distance'
import { EventRepository } from '../EventRepository'
import { shouldSupportOneToManyRelation } from '../../../test/RelationRepositoryTestUtils'
import { PersonRepository } from 'backend/app/events/external/PersonRepository';

describe('EventRepository', () => {
  shouldSupportStandardCrudFunctions({
    repository: EventRepository,
    example: givenThatAnEventExists,
    updateExample: () => ({ name: 'new name' }),
  })

  shouldSupportOneToManyRelation({
    repository: EventRepository,
    relation: 'speakers',

    sourceExample: givenThatAnEventExists,
    destExample: givenThatAPersonExists,
  })

  describe('.findByTimeAndLocation', () => {
    it(
      'returns only nearby events',
      withDb(async () => {
        const repository = new EventRepository()
        const startTime = new Date('2015-01-01')

        const nearby = await givenThatAnEventExists({
          startTime,
          location: someGeoPoint(20, 20),
        })

        const farAway = await givenThatAnEventExists({
          startTime,
          location: someGeoPoint(-20, -20),
        })

        const results = await repository.findByTimeAndLocation({
          distance: new Distance(10, DistanceUnit.km),
          fromTime: new Date('2010-01-01'),
          toTime: new Date('2020-01-01'),
          location: someGeoPoint(20, 20),
        })

        expect(results.map(r => r.id)).toEqual([nearby.id])
      }),
    )
  })
})
describe('.findEventsbySpeaker', () => {
    it(
      'returns event asociated with a speaker',
      withDb(async () => {

        
        const eventRepository = new EventRepository()
        const personRepository = new PersonRepository()
        
        const startTime = new Date('2015-01-01')

        var event1Name = "testEvent1"
        var event2Name = "testEvent2"
        var speakers = ["testSpeaker1"]
       
        var event1 = await givenThatAnEventExists({
          startTime,
          location: someGeoPoint(),
          name: event1Name
        })

        var event2 = await givenThatAnEventExists({
          startTime,
          location: someGeoPoint(),
          name: event2Name
        })

        var events = [event1.id,event2.id]

        var speaker = await givenThatAPersonExists({
          name:speakers[0]
        })

        await eventRepository.speakers.add(event1.id, [speaker.id])
        await eventRepository.speakers.add(event2.id, [speaker.id])

        const results = await eventRepository.findEventsbySpeaker(speaker.id)
        const result = results.map(r => r.id)
        expect(result).toEqual(events)
      }),
    )
  })
