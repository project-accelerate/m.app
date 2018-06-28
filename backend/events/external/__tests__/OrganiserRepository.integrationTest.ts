import { someString, someGeoPoint } from '../../../../common/test/testUtils'
import { withDb } from '../../../test/integrationTestUtils'
import { shouldSupportStandardCrudFunctions } from '../../../test/CrudRepositoryTestUtils'
import { OrganiserRepository } from '../OrganiserRepository'
import {
  someOrganiserProps,
  fullOrganiserProps,
} from '../../test/eventTestUtils'

describe('OrganiserRepository', () => {
  shouldSupportStandardCrudFunctions({
    repository: OrganiserRepository,
    example: someOrganiserProps,
    updateExample: () => ({ name: 'new name' }),
  })

  describe('with all props provided', () => {
    shouldSupportStandardCrudFunctions({
      repository: OrganiserRepository,
      example: fullOrganiserProps,
      updateExample: () => ({ name: 'new name' }),
    })
  })
})
