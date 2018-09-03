import { Service } from 'typedi'
import {
  RegisterConferenceAttendanceRequest,
  RegisterConferenceAttendanceResponse,
} from 'backend/app/conference/domain/ConferenceAttendance'
import { UserAdminService } from 'backend/app/user/application/UserAdminService'
import { DeviceAdminService } from 'backend/app/device/application/DeviceAdminService'

@Service()
export class ConferenceAttendanceAdminService {
  constructor(
    private deviceAdminService: DeviceAdminService,
    private userAdminService: UserAdminService,
  ) {}

  async registerConferenceAttendances(
    request: RegisterConferenceAttendanceRequest,
  ): Promise<RegisterConferenceAttendanceResponse> {
    const user = await this.userAdminService.addUser(request.user)

    const device = await this.deviceAdminService.registerDeviceToOwner({
      device: request.device,
      owner: user.id,
    })

    return {
      user,
      device,
    }
  }
}
