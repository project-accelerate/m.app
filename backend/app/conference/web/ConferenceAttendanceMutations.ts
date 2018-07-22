import { Resolver, Mutation } from 'type-graphql'
import { MutationRequest } from 'backend/app/common/resolverUtils'
import {
  RegisterConferenceAttendanceRequest,
  RegisterConferenceAttendanceResponse,
} from '../domain/ConferenceAttendance'
import { ConferenceAttendanceAdminService } from '../application/ConferenceAttendanceAdminService'

@Resolver()
export class RegisterConferenceAttendance {
  constructor(
    private conferenceAttendanceAdminService: ConferenceAttendanceAdminService,
  ) {}

  @Mutation(() => RegisterConferenceAttendanceResponse)
  registerConferenceAttendance(
    @MutationRequest(() => RegisterConferenceAttendanceRequest)
    request: RegisterConferenceAttendanceRequest,
  ): Promise<RegisterConferenceAttendanceResponse> {
    return this.conferenceAttendanceAdminService.registerConferenceAttendances(
      request,
    )
  }
}
