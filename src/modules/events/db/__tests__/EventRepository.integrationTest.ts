import { someString, someGeoPoint } from "../../../../test/testUtils";
import { withDb } from "../../../../test/integrationTestUtils";
import { shouldSupportStandardCrudFunctions } from "../../../../test/CrudRepositoryTestUtils";
import { someEventProps, givenThatAnOrganiserExists, givenThatAVenueExists, givenThatAnEventExists } from "../../test/eventTestUtils";
import { Distance, DistanceUnit } from '../../domain/Distance'
import { EventRepository } from "../EventRepository";

describe('EventRepository', () => {
  shouldSupportStandardCrudFunctions({
    repository: EventRepository,
    example: someEventProps,
    relationshipExamples: {
      organiser: givenThatAnOrganiserExists,
      venue: givenThatAVenueExists,
    }
  })

  describe('.findByTimeAndLocation', () => {
    it('returns only nearby events', withDb(async () => {
      const repository = new EventRepository()
      const startTime = new Date('2015-01-01')

      const nearby = await givenThatAnEventExists({
        startTime,
        location: someGeoPoint(20, 20)
      })
    
      const farAway = await givenThatAnEventExists({
        startTime,
        location: someGeoPoint(-20, -20)
      })

      const results = await repository.findByTimeAndLocation({
        distance: new Distance(10, DistanceUnit.km),
        fromTime: new Date('2010-01-01'),
        toTime: new Date('2020-01-01'),
        location: {
          type: 'Point',
          coordinates: [20, 20]
        }
      })

      expect(results.map(r => r.id)).toEqual([
        nearby
      ])
    }))
  })
})
