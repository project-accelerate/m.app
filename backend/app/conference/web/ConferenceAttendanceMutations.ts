import { Resolver, Mutation } from 'type-graphql'
import { MutationRequest } from 'backend/app/common/resolverUtils'
import {
  ConferenceAttendance,
  RegisterConferenceAttendanceRequest,
} from '../domain/ConferenceAttendance'
import { ConferenceAttendanceAdminService } from 'backend/app/conference/application/ConferenceAttendanceAdminService'

@Resolver()
export class RegisterConferenceAttendance {
  constructor(
    private conferenceAttendanceAdminService: ConferenceAttendanceAdminService,
  ) {}

  @Mutation(() => [ConferenceAttendance])
  registerConferenceAttendance(
    @MutationRequest(() => RegisterConferenceAttendanceRequest)
    request: RegisterConferenceAttendanceRequest,
  ): Promise<ConferenceAttendance[]> {
    return this.conferenceAttendanceAdminService.registerConferenceAttendances(
      request,
    )
  }
}
