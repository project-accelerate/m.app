import { shouldSupportStandardCrudFunctions } from '../../../test/CrudRepositoryTestUtils'
import { ConferenceAttendanceRepository } from '../ConferenceAttendanceRepository'
import {
  givenThatAConferenceAttendanceExists,
  someOtherConferenceId,
} from '../../test/conferenceTestUtils'
import { ConferenceId } from 'backend/app/conference/domain/Conference'

describe('ConferenceAttendanceRepository', () => {
  shouldSupportStandardCrudFunctions({
    repository: ConferenceAttendanceRepository,
    example: givenThatAConferenceAttendanceExists,
    updateExample: () => ({ conference: someOtherConferenceId() }),
  })
})
