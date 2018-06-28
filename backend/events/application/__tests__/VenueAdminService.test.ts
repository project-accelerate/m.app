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
  someCreateVenueRequest,
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

describe('VenueAdminService', () => {
  it('saves all data when new venue is created', async () => {
    const fixture = new Fixture()
    const location = someGeoPoint()

    const request = someCreateVenueRequest({
      photoUpload: someImageUpload(),
    })

    fixture.venueRepository.givenIdReturnedFromInsert('venue-id')
    fixture.photoStorage.givenThatThePhotoIsSavedWithId('photo-id')
    fixture.givenLocationForPostcode(request.address.postcode, location)

    const venueId = await fixture.venueAdmin.addVenue(request)
    expect(venueId).toEqual('venue-id')

    fixture.venueRepository.verifyInserted({
      name: request.name,
      photo: 'photo-id',
      description: request.description,
      location,
      streetAddress: request.address.streetAddress,
      city: request.address.city,
      postcode: request.address.postcode,
    })

    fixture.photoStorage.verifyPhotoSaved(await request.photoUpload)
  })
})

class Fixture {
  venueRepository = new MockCrudRepositoryFixture(VenueRepository)
  photoStorage = new MockPhotoStorageFixture()
  postcodesClient = mock(PostcodesIOClient)

  venueAdmin = new VenueAdminService(
    this.venueRepository.instance,
    this.photoStorage.instance,
    instance(this.postcodesClient),
  )

  givenLocationForPostcode(postcode: string, location: Point) {
    const [longitude, latitude] = location.coordinates

    when(this.postcodesClient.getPostcode(postcode)).thenResolve(
      somePostcodesIoPostcode({ postcode, latitude, longitude }),
    )
  }
}
