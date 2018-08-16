import { EventAttendanceRepository } from 'backend/app/conference/external/EventAttedanceRepository'
import { shouldSupportStandardCrudFunctions } from '../../../test/CrudRepositoryTestUtils'
import { givenThatAnEventAttendanceExists } from '../../test/conferenceTestUtils'
import { givenThatAnEventExists } from 'backend/app/events/test/eventTestUtils'

describe(EventAttendanceRepository, () => {
  shouldSupportStandardCrudFunctions({
    repository: EventAttendanceRepository,
    example: givenThatAnEventAttendanceExists,
    updateExample: async () => ({
      event: (await givenThatAnEventExists()).id,
    }),
  })
})
