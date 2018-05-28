import { OrganiserRepository } from "../OrganiserRepository";
import { someString } from "../../../../test/testUtils";
import { withDb } from "../../../../test/integrationTestUtils";
import { shouldSupportStandardCrudFunctions } from "../../../../test/CrudRepositoryTestUtils";
import { someOrganiserProps } from "../../test/eventTestUtils";

describe('OrganiserRepository', () => {
  shouldSupportStandardCrudFunctions({
    repository: OrganiserRepository,
    example: someOrganiserProps,
  })
})
