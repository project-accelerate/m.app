import { shouldSupportStandardCrudFunctions } from '../../../test/CrudRepositoryTestUtils'
import { OrganiserRepository } from '../OrganiserRepository'
import { givenThatAnOrganiserExists } from '../../test/eventTestUtils'

describe('OrganiserRepository', () => {
  shouldSupportStandardCrudFunctions({
    repository: OrganiserRepository,
    example: givenThatAnOrganiserExists,
    updateExample: () => ({ name: 'new name' }),
  })
})
