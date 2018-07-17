import { Service } from 'typedi'
import { ConferenceAttendanceRepository } from '../external/ConferenceAttendanceRepository'
import {
  RegisterConferenceAttendanceRequest,
  ConferenceAttendance,
} from 'backend/app/conference/domain/ConferenceAttendance'
import { UserAdminService } from 'backend/app/user/application/UserAdminService'
import { DeviceAdminService } from 'backend/app/user/application/DeviceAdminService'

@Service()
export class ConferenceAttendanceAdminService {
  constructor(
    private conferenceAttendanceRepository: ConferenceAttendanceRepository,
    private deviceAdminService: DeviceAdminService,
    private userAdminService: UserAdminService,
  ) {}

  async registerConferenceAttendances(
    request: RegisterConferenceAttendanceRequest,
  ): Promise<ConferenceAttendance[]> {
    const user = await this.userAdminService.addUser(request.user)

    await this.deviceAdminService.registerDeviceToOwner({
      device: request.device,
      owner: user.id,
    })

    return await Promise.all(
      request.attendances.map(conference =>
        this.conferenceAttendanceRepository.insert({
          attendee: user.id,
          conference,
        }),
      ),
    )
  }
}
