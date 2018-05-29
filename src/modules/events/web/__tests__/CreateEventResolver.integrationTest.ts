import { givenThatAnEventExists, givenThatAVenueExists, givenThatAnOrganiserExists, someEventProps } from "../../test/eventTestUtils";
import { withDb, execQuery } from "../../../../test/integrationTestUtils";
import { someString, somePostcode, someDate } from "../../../../test/testUtils";
import { CreateEventRequest } from "../CreateEventResolver";

describe('EventResolver', () => {
  describe('.createEvent', () => {
    it('creates the event and returns it', withDb(async () => {
      const result = await execQuery<{ request: CreateEventRequest }>({
        body: `
          mutation($request: CreateEventRequest) {
            createEvent(request: $request) {
              name
              venue {
                name
              }
              organiser {
                name
              }
            }
          }
        `,
        variables: {
          request: {
            startTime: someDate(),
            endTime: someDate(),
            introduction: someString(),
            name: 'my-event',
            venueName: 'my-venue',
            organiserName: 'my-organiser',
            postcode: somePostcode(),
          }
        }
      })

      expect(result.createEvent).toMatchObject({
        name: "my-event",
        organiser: {
          name: "my-organiser"
        },
        venue: {
          name: "my-venue"
        }
      })
    }))
  })
})

