import { givenThatAVenueExists, someEventProps } from "../../test/eventTestUtils";
import { withDb, execQuery, execSuccessfulQuery } from "../../../../test/integrationTestUtils";

describe('VenueResolver', () => {
  describe('.createVenue', () => {
    it('looks up venues by id', withDb(async () => {
      const venueId = await givenThatAVenueExists({ name: "foo" })
      const result = await execSuccessfulQuery(`
        {
          venue(id: "${venueId}") {
            name
          }
        }
      `)

      expect(result.venue).toMatchObject({
        name: "foo"
      })
    }))
  })
})