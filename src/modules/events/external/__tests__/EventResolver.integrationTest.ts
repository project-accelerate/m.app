import { givenThatAnEventExists, givenThatAVenueExists, givenThatAnOrganiserExists, someEventProps } from "../../test/eventTestUtils";
import { withDb, execQuery, execSuccessfulQuery } from "../../../../test/integrationTestUtils";

describe('EventResolver', () => {
  describe('.createEvent', () => {
    it('creates the event and returns it', withDb(async () => {
      const venue = await givenThatAVenueExists()
      const organiser = await givenThatAnOrganiserExists()

      const result = await execSuccessfulQuery(`
        mutation($request: CreateEventRequest) {
          createEvent(request: $request) {
            name
          }
        }
      `, {
        request: someEventProps({ venue, organiser, name: 'myevent' })
      })

      expect(result.createEvent).toMatchObject({
        name: "myevent"
      })
    }))

    it('looks up events by id', withDb(async () => {
      const eventId = await givenThatAnEventExists({ name: "foo" })
      const result = await execSuccessfulQuery(`
        {
          event(id: "${eventId}") {
            name
          }
        }
      `)

      expect(result.event).toMatchObject({
        name: "foo"
      })
    }))
  })
})
