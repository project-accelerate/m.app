import { shouldSupportStandardCrudFunctions } from '../../../test/CrudRepositoryTestUtils'
import { UserRepository } from '../UserRepository'
import { givenThatAUserExists } from '../../test/userTestUtils'
import { someOtherBool } from 'common/test/testUtils'

describe('UserRepository', () => {
  shouldSupportStandardCrudFunctions({
    repository: UserRepository,
    example: givenThatAUserExists,
    updateExample: () => ({ optedIntoNotifications: someOtherBool() }),
  })
})
