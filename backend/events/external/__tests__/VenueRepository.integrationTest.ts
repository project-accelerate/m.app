import { someString, someGeoPoint } from 'common/test/testUtils'
import { withDb } from '../../../test/integrationTestUtils'
import { shouldSupportStandardCrudFunctions } from '../../../test/CrudRepositoryTestUtils'
import { VenueRepository } from '../VenueRepository'
import { someVenueProps } from '../../test/eventTestUtils'

describe('VenueRepository', () => {
  shouldSupportStandardCrudFunctions({
    repository: VenueRepository,
    example: someVenueProps,
  })
})
