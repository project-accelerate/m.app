import {
  mock,
  when,
  anything,
  verify,
  instance,
  deepEqual,
} from 'ts-mockito/lib/ts-mockito'
import {
  somePostcode,
  someGeoPoint,
  someDate,
  someString,
  someUuid,
} from 'common/test/testUtils'
import { MockCrudRepositoryFixture } from 'backend/app/common/test/MockCrudRepositoryFixture'
import { MockRelationFixture } from 'backend/app/common/test/MockRelationFixture'
import { EventRepository } from '../../external/EventRepository'
import { EventAdminService } from '../EventAdminService'
import {
  someCreateEventRequest,
  someVenue,
  somePerson,
  someEvent,
} from '../../test/eventTestUtils'
import { VenueRepository } from '../../external/VenueRepository'
import { MockPhotoStorageFixture } from '../../test/MockPhotoStorageFixture'
import { someImageUpload } from '../../../test/testUtils'
import { Person } from '../../domain/Person'
import { omit } from 'lodash'
import { PushNotificationService } from 'backend/app/device/application/PushNotificationService'
import { DeviceRepository } from 'backend/app/device/external/DeviceRepository'
import { EventAttendanceRepository } from 'backend/app/conference/external/EventAttedanceRepository'

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

    fixture.venueRepository.givenObjectReturnedFromFindById(venue)
    fixture.eventRepository.givenIdReturnedFromInsert('event-id')
    fixture.photoStorage.givenThatThePhotoIsSavedWithId('photo-id')

    const event = await fixture.eventAdmin.submitEvent(eventRequest)

    expect(event.id).toEqual('event-id')

    fixture.eventRepository.verifyInserted({
      name: eventRequest.name,
      family: eventRequest.family,
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

  it('updates an event when resubmitting an event with an import ref', async () => {
    const fixture = new Fixture()

    const newVenue = someVenue()
    const newSpeaker = somePerson({ id: 'new-person' })
    const updateRequest = someCreateEventRequest({
      venue: newVenue.id,
      photoUpload: someImageUpload(),
      speakers: [newSpeaker.id],
      importRef: 'import',
    })
    const existingEvent = someEvent({ importRef: 'import', id: 'my-event' })

    fixture.venueRepository.givenObjectReturnedFromFindById(newVenue)
    fixture.eventRepository.givenObjectReturnedFromFind(
      { importRef: 'import' },
      existingEvent,
    )
    fixture.photoStorage.givenThatThePhotoIsSavedWithId('photo-id')

    const event = await fixture.eventAdmin.submitEvent(updateRequest)

    expect(event.id).toEqual('my-event')

    fixture.eventRepository.verifyUpdated('my-event', {
      ...omit(existingEvent, 'id'),
      venue: newVenue.id,
    })

    fixture.speakersRelation.verifyReplaced(event.id, [newSpeaker.id])
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
    instance(mock(EventAttendanceRepository)),
    this.venueRepository.instance,
    this.photoStorage.instance,
    instance(mock(PushNotificationService)),
    instance(mock(DeviceRepository)),
  )
}
