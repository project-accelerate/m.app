import { MeetupRepository } from 'backend/app/meetup/external/MeetupModerationQueueRepository'
import { Service } from 'typedi'
import { CreateMeetupRequest } from 'backend/app/meetup/domain/Meetup'
import { UserRepository } from 'backend/app/user/external/UserRepository'
import { DeviceRepository } from 'backend/app/device/external/DeviceRepository'

@Service()
export class MeetupAdminService {
  constructor(
    private meetupRepository: MeetupRepository,
    private userRepository: UserRepository,
    private deviceRepository: DeviceRepository,
  ) {}

  async submitMeetup({
    detail,
    endTime,
    hostedBy,
    introduction,
    name,
    startTime,
    venueName,
    userId,
    deviceId,
  }: CreateMeetupRequest) {
    const user = await this.userRepository.findOneRequired({ id: userId })
    const device = await this.deviceRepository.findOneRequired({
      owner: user.id,
    })

    // Does venue exist? If so insert venue reference immediately

    return this.meetupRepository.insert({
      user,
      name,
      startTime,
      endTime,
      introduction,
      detail,
      hostedBy,
      venueName,
    })
  }
}
