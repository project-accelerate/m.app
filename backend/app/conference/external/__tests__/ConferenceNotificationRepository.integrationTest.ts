import { shouldSupportStandardCrudFunctions } from '../../../test/CrudRepositoryTestUtils'
import { ConferenceNotificationRepository } from '../ConferenceNotificationRepository'
import { givenThatAConferenceNotificationHasBeenSent } from '../../test/conferenceNotificationTestUtils'

describe('ConferenceNotificationRepository', () => {
  shouldSupportStandardCrudFunctions({
    repository: ConferenceNotificationRepository,
    example: givenThatAConferenceNotificationHasBeenSent,
    updateExample: () => ({ message: 'New message' }),
  })
})
