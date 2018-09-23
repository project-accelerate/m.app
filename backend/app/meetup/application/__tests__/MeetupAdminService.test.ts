import { MockCrudRepositoryFixture } from 'backend/app/common/test/MockCrudRepositoryFixture'
import { MeetupAdminService } from 'backend/app/meetup/application/MeetupAdminService'
import { MeetupRepository } from 'backend/app/meetup/external/MeetupModerationQueueRepository'
import { UserRepository } from 'backend/app/user/external/UserRepository'
import { someUser } from 'backend/app/user/test/userTestUtils'
import { someDate, someUuid } from 'common/test/testUtils'
import { DeviceRepository } from 'backend/app/device/external/DeviceRepository'
import { someDevice } from 'backend/app/device/test/deviceTestUtils'

describe('MeetupAdminService', () => {
  it('saves all data when new event is created', async () => {
    const fixture = new Fixture()
    const meetupId = someUuid()
    const user = someUser()
    const device = someDevice({
      owner: user.id,
    })

    const createMeetupRequest = {
      detail: 'Meet some people to do something',
      endTime: someDate(),
      hostedBy: 'Momentum Mars',
      introduction: 'Meet some people',
      name: 'A Meetup',
      startTime: someDate(),
      venueName: 'Meeting Room',
      userId: user.id,
      deviceId: 'some-device',
    }

    fixture.meetupRepository.givenIdReturnedFromInsert(meetupId)
    fixture.userRepository.givenObjectReturnedFromFindById(user)
    fixture.deviceRepository.givenObjectsReturnedFromFind(someDe, {
      userId: user.id,
    })

    const meetup = await fixture.meetupAdmin.submitMeetup(createMeetupRequest)

    expect(meetup.id).toEqual(meetupId)

    // fixture.eventRepository.verifyInserted({
    //   name: eventRequest.name,
    //   family: eventRequest.family,
    //   venue: venue.id,
    //   location: venue.location,
    //   introduction: eventRequest.introduction,
    //   detail: eventRequest.detail,
    //   startTime: eventRequest.startTime,
    //   endTime: eventRequest.endTime,
    //   photo: 'photo-id',
    // })

    fixture.meetupRepository.verifyInserted({
      detail: 'Meet some people to do something',
      endTime: someDate(),
      hostedBy: 'Momentum Mars',
      introduction: 'Meet some people',
      name: 'A Meetup',
      startTime: someDate(),
      venueName: 'Meeting Room',
      userId: user.id,
    })

    // fixture.speakersRelation.verifyAdded(event.id, speaker.id)

    // fixture.photoStorage.verifyPhotoSaved(await eventRequest.photoUpload)
  })
})

class Fixture {
  meetupRepository = new MockCrudRepositoryFixture(MeetupRepository)
  userRepository = new MockCrudRepositoryFixture(UserRepository)
  deviceRepository = new MockCrudRepositoryFixture(DeviceRepository)

  meetupAdmin = new MeetupAdminService(
    this.meetupRepository.instance,
    this.userRepository.instance,
    this.deviceRepository.instance,
  )
}
