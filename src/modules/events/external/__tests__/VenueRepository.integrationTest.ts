import { VenueRepository } from "../VenueRepository";
import { someString } from "../../../../test/testUtils";
import { withDb } from "../../../../test/integrationTestUtils";
import { shouldSupportStandardCrudFunctions } from "../../../../test/CrudRepositoryTestUtils";
import { someVenueProps } from "../../test/eventTestUtils";

describe('VenueRepository', () => {
  shouldSupportStandardCrudFunctions({
    repository: VenueRepository,
    example: someVenueProps,
  })
})
