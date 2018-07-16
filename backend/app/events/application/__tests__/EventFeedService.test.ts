import { mock, instance, when, deepEqual } from 'ts-mockito/lib/ts-mockito'
import { Point } from 'geojson'
import {
  someInt,
  somePostcode,
  someGeoPoint,
  someOutcode,
} from 'common/test/testUtils'
import { EventRepository } from '../../external/EventRepository'
import { PostcodesIOClient } from '../../external/PostcodesIOClient'
import { EventFeedService } from '../EventFeedService'
import { DateProvider } from '../../../common/DateProvider'
import {
  somePostcodesIoPostcode,
  someEventProps,
  someDistance,
  someEvent,
  somePostcodesIoOutcode,
} from '../../test/eventTestUtils'
import { Distance, DistanceUnit } from '../../domain/Distance'
import { Event } from '../../domain/Event'
import { startOfDay } from 'date-fns'

describe('EventFeedService', () => {
  it('should search by postcode', async () => {
    const fixture = new Fixture()
    const location = someGeoPoint()
    const postcode = somePostcode()
    const events = [someEvent()]

    fixture.givenSomeSavedEventsForExactQuery({
      distance: new Distance(10, DistanceUnit.miles),
      fromTime: startOfDay('2010-01-01'),
      toTime: startOfDay('2010-04-01'),
      location,
      events,
    })

    fixture.givenLocationForPostcode(postcode, location)
    fixture.givenCurrentDate(startOfDay('2010-01-01'))

    const returnedEvents = await fixture.feedService.eventFeed({
      months: 3,
      postcode,
      radiusInMiles: 10,
    })

    expect(returnedEvents).toEqual(events)
  })

  it('should search by outcode', async () => {
    const fixture = new Fixture()
    const location = someGeoPoint()
    const outcode = someOutcode()
    const events = [someEvent()]

    fixture.givenSomeSavedEventsForExactQuery({
      distance: new Distance(10, DistanceUnit.miles),
      fromTime: startOfDay('2010-01-01'),
      toTime: startOfDay('2010-04-01'),
      location,
      events,
    })

    fixture.givenLocationForOutcode(outcode, location)
    fixture.givenCurrentDate(startOfDay('2010-01-01'))

    const returnedEvents = await fixture.feedService.eventFeed({
      months: 3,
      postcode: outcode,
      radiusInMiles: 10,
    })

    expect(returnedEvents).toEqual(events)
  })

  it('should reject invalid postcode', async () => {
    const fixture = new Fixture()

    const fetchEvents = fixture.feedService.eventFeed({
      months: 3,
      postcode: '',
      radiusInMiles: 10,
    })

    expect(fetchEvents).rejects.toHaveProperty(
      'message',
      expect.stringMatching('Invalid postcode'),
    )
  })
})

class Fixture {
  eventRepository = mock(EventRepository)
  postcodeClient = mock(PostcodesIOClient)
  dateProvider = mock(DateProvider)

  feedService = new EventFeedService(
    instance(this.eventRepository),
    instance(this.postcodeClient),
    instance(this.dateProvider),
  )

  givenCurrentDate(date: Date) {
    when(this.dateProvider.now()).thenReturn(date)
  }

  givenLocationForPostcode(postcode: string, location: Point) {
    const [longitude, latitude] = location.coordinates

    when(this.postcodeClient.getPostcode(postcode)).thenResolve(
      somePostcodesIoPostcode({ postcode, latitude, longitude }),
    )
  }

  givenLocationForOutcode(outcode: string, location: Point) {
    const [longitude, latitude] = location.coordinates

    when(this.postcodeClient.getOutcode(outcode)).thenResolve(
      somePostcodesIoOutcode({ outcode, latitude, longitude }),
    )
  }

  givenSomeSavedEventsForExactQuery(opts: {
    fromTime: Date
    toTime: Date
    distance: Distance
    location: Point
    events: Event[]
  }) {
    when(
      this.eventRepository.findByTimeAndLocation(
        deepEqual({
          fromTime: opts.fromTime,
          toTime: opts.toTime,
          distance: opts.distance,
          location: opts.location,
        }),
      ),
    ).thenResolve(opts.events)
  }
}
