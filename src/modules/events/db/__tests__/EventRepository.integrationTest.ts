import { EventRepository } from "../EventRepository";
import { someString } from "../../../../test/testUtils";
import { withDb } from "../../../../test/integrationTestUtils";
import { shouldSupportStandardCrudFunctions } from "../../../../test/CrudRepositoryTestUtils";
import { someEventProps, givenThatAnOrganiserExists, givenThatAVenueExists } from "../../test/eventTestUtils";

describe('EventRepository', () => {
  shouldSupportStandardCrudFunctions({
    repository: EventRepository,
    example: someEventProps,
    relationshipExamples: {
      organiser: givenThatAnOrganiserExists,
      venue: givenThatAVenueExists,
    }
  })
})
