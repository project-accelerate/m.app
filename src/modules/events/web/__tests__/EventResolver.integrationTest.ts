import { givenThatAnEventExists, givenThatAVenueExists, givenThatAnOrganiserExists, someEventProps } from "../../test/eventTestUtils";
import { withDb, execQuery } from "../../../../test/integrationTestUtils";
import { someString, somePostcode, someDate } from "../../../../test/testUtils";

describe('EventResolver', () => {
  describe('.createEvent', () => {

    it('looks up events by id and tranverses relationships', withDb(async () => {
      const venue = await givenThatAVenueExists()
      const organiser = await givenThatAnOrganiserExists()
      const eventId = await givenThatAnEventExists({
        venue,
        organiser
      })

      const result = await execQuery(`
        {
          event(id: "${eventId}") {
            id
            venue {
              id
            }
            organiser {
              id
            }
          }
        }
      `)

      expect(result.event).toMatchObject({
        id: eventId,
        venue: {
          id: venue
        },
        organiser: {
          id: organiser
        }
      })
    }))
  })
})
