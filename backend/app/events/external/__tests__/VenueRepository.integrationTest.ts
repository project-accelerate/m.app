import { shouldSupportStandardCrudFunctions } from '../../../test/CrudRepositoryTestUtils'
import { VenueRepository } from '../VenueRepository'
import { givenThatAVenueExists } from '../../test/eventTestUtils'

describe('VenueRepository', () => {
  shouldSupportStandardCrudFunctions({
    repository: VenueRepository,
    example: givenThatAVenueExists,
    updateExample: () => ({ description: 'new description' }),
  })
})
