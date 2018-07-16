import { shouldSupportStandardCrudFunctions } from '../../../test/CrudRepositoryTestUtils'
import { DeviceRepository } from '../DeviceRepository'
import {
  givenThatADeviceExists,
  someOtherDeviceType,
} from '../../test/userTestUtils'

describe('DeviceRepository', () => {
  shouldSupportStandardCrudFunctions({
    repository: DeviceRepository,
    example: givenThatADeviceExists,
    updateExample: () => ({ deviceType: someOtherDeviceType() }),
  })
})
