import {
  mock,
  when,
  anything,
  verify,
  instance,
  deepEqual,
} from 'ts-mockito/lib/ts-mockito'
import { EventRepository } from '../../external/EventRepository'
import { EventAdminService } from '../EventAdminService'
import {
  someCreateEventRequest,
  someVenue,
  somePerson,
} from '../../test/eventTestUtils'
import {
  somePostcode,
  someGeoPoint,
  someDate,
  someString,
  someUuid,
} from '../../../../common/test/testUtils'
import { VenueRepository } from '../../external/VenueRepository'
import { MockCrudRepositoryFixture } from './fixtures/MockCrudRepositoryFixture'
import { MockPhotoStorageFixture } from './fixtures/MockPhotoStorageFixture'
import { someImageUpload } from '../../../test/testUtils'
import { MockRelationFixture } from './fixtures/MockRelationFixture'
import { Person } from '../../domain/Person'

describe('EventAdminService', () => {
  it('saves all data when new event is created', async () => {
    const fixture = new Fixture()

    const venue = someVenue()
    const speaker = somePerson()
    const eventRequest = someCreateEventRequest({
      venue: venue.id,
      photoUpload: someImageUpload(),
      speakers: [speaker.id],
    })

    fixture.venueRepository.givenObjectReturnedFromFindOne(venue)
    fixture.eventRepository.givenIdReturnedFromInsert('event-id')
    fixture.photoStorage.givenThatThePhotoIsSavedWithId('photo-id')

    const event = await fixture.eventAdmin.submitEvent(eventRequest)

    expect(event.id).toEqual('event-id')

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

    fixture.speakersRelation.verifyAdded(event.id, speaker.id)

    fixture.photoStorage.verifyPhotoSaved(await eventRequest.photoUpload)
  })
})

class Fixture {
  speakersRelation = new MockRelationFixture<Person>()
  eventRepository = new MockCrudRepositoryFixture(EventRepository).mockRelation(
    'speakers',
    this.speakersRelation,
  )

  venueRepository = new MockCrudRepositoryFixture(VenueRepository)
  photoStorage = new MockPhotoStorageFixture()

  eventAdmin = new EventAdminService(
    this.eventRepository.instance,
    this.venueRepository.instance,
    this.photoStorage.instance,
  )
}
