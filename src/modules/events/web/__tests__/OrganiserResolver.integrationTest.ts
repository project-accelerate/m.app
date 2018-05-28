import { givenThatAnOrganiserExists, someEventProps } from "../../test/eventTestUtils";
import { withDb, execQuery, execSuccessfulQuery } from "../../../../test/integrationTestUtils";

describe('OrganiserResolver', () => {
  describe('.createOrganiser', () => {
    it('looks up organisers by id', withDb(async () => {
      const organiserId = await givenThatAnOrganiserExists({ name: "foo" })
      const result = await execSuccessfulQuery(`
        {
          organiser(id: "${organiserId}") {
            name
          }
        }
      `)

      expect(result.organiser).toMatchObject({
        name: "foo"
      })
    }))
  })
})
