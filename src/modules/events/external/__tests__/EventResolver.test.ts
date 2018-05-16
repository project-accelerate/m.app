import { givenThatAnEventExists } from "../../test/eventTestUtils";
import { withDb, execQuery, execSuccessfulQuery } from "../../../../test/integrationTestUtils";

describe('EventResolver', () => {
  describe('.createEvent', () => {
    it('creates the event and returns it', withDb(async () => {
      const result = await execSuccessfulQuery(`
        mutation {
          createEvent(request: { name: "foo" }) {
            name
          }
        }
      `)

      expect(result.createEvent).toMatchObject({
        name: "foo"
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
