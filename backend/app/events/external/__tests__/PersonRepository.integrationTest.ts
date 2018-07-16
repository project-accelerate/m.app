import { shouldSupportStandardCrudFunctions } from '../../../test/CrudRepositoryTestUtils'
import { PersonRepository } from '../PersonRepository'
import { givenThatAPersonExists } from '../../test/eventTestUtils'

describe('PersonRepository', () => {
  shouldSupportStandardCrudFunctions({
    repository: PersonRepository,
    example: givenThatAPersonExists,
    updateExample: () => ({ name: 'new name' }),
  })
})
