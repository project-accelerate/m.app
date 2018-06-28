import {
  mock,
  when,
  anything,
  verify,
  instance,
  deepEqual,
} from 'ts-mockito/lib/ts-mockito'
import { Point } from 'geojson'
import { PostcodesIOClient } from '../../external/PostcodesIOClient'
import { EventRepository } from '../../external/EventRepository'
import { OrganiserAdminService } from '../OrganiserAdminService'
import { VenueAdminService } from '../VenueAdminService'
import { EventAdminService } from '../EventAdminService'
import {
  somePostcodesIoPostcode,
  someEventProps,
  someCreateEventRequest,
  someVenue,
} from '../../test/eventTestUtils'
import {
  somePostcode,
  someGeoPoint,
  someDate,
  someString,
  someUuid,
} from '../../../../common/test/testUtils'
import { VenueRepository } from '../../external/VenueRepository'
import { PhotoStorageService } from '../PhotoStorageService'
import { MockCrudRepositoryFixture } from './fixtures/MockCrudRepositoryFixture'
import { MockPhotoStorageFixture } from './fixtures/MockPhotoStorageFixture'
import { someImageUpload } from '../../../test/testUtils'

describe('EventAdminService', () => {
  it('saves all data when new event is created', async () => {
    const fixture = new Fixture()

    const venue = someVenue()
    const eventRequest = someCreateEventRequest({
      venue: venue.id,
      photoUpload: someImageUpload(),
    })

    fixture.venueRepository.givenObjectReturnedFromFindOne(venue)
    fixture.eventRepository.givenIdReturnedFromInsert('event-id')
    fixture.photoStorage.givenThatThePhotoIsSavedWithId('photo-id')

    const eventId = await fixture.eventAdmin.submitEvent(eventRequest)

    expect(eventId).toEqual('event-id')

    fixture.eventRepository.verifyInserted({
      name: eventRequest.name,
      organiser: eventRequest.organiser,
      venue: venue.id,
      location: venue.location,
      introduction: eventRequest.introduction,
      detail: eventRequest.detail,
      startTime: eventRequest.startTime,
      endTime: eventRequest.endTime,
      photo: 'photo-id',
    })

    fixture.photoStorage.verifyPhotoSaved(await eventRequest.photoUpload)
  })
})

class Fixture {
  eventRepository = new MockCrudRepositoryFixture(EventRepository)
  venueRepository = new MockCrudRepositoryFixture(VenueRepository)
  photoStorage = new MockPhotoStorageFixture()

  eventAdmin = new EventAdminService(
    this.eventRepository.instance,
    this.venueRepository.instance,
    this.photoStorage.instance,
  )

  // givenLocationForPostcode(postcode: string, location: Point) {
  //   const [longitude, latitude] = location.coordinates

  //   when(this.postcodesClient.getPostcode(postcode)).thenResolve(
  //     somePostcodesIoPostcode({ postcode, latitude, longitude }),
  //   )
  // }
}
