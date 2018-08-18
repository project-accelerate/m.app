import { shouldSupportStandardCrudFunctions } from 'backend/app/test/CrudRepositoryTestUtils'
import { givenThatAPendingNotificationExists } from '../../test/pendingNotificationTestUtils';
import { PendingNotificationRepository } from '../PendingNotificationRepository';

describe(PendingNotificationRepository, () => {
  shouldSupportStandardCrudFunctions({
    repository: PendingNotificationRepository,
    example: givenThatAPendingNotificationExists,
    updateExample: () => ({ timeSent: new Date() }),
  })
})
