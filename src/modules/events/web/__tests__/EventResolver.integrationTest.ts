import { givenThatAnEventExists, givenThatAVenueExists, givenThatAnOrganiserExists, someEventProps } from "../../test/eventTestUtils";
import { withDb, execQuery } from "../../../../test/integrationTestUtils";
import { someString, somePostcode, someDate, someGeoPoint } from "../../../../test/testUtils";
import { EventFeedArgs } from "../EventResolver";
import { addDays } from "date-fns";

describe('EventResolver', () => {
  it('looks up events by id, returning associated objects', withDb(async () => {
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

  it('finds nearby upcoming events', withDb(async () => {
    // Location is the long/lat coordinates of the postcode
    const postcode = "OX49 5NU"
    const location = someGeoPoint(-1.06986930435083, 51.656143706615)

    const eventId = await givenThatAnEventExists({
      location,
      startTime: addDays(new Date(), 2)
    })

    const result = await execQuery<EventFeedArgs>({
      body: `
        query($radiusInMiles: Float!, $postcode: String!){
          eventFeed(radiusInMiles: $radiusInMiles, postcode: $postcode) {
            id
          }
        }
      `,
      variables: {
        radiusInMiles: 1,
        postcode
      }
    })

    expect(result.eventFeed).toMatchObject([
      {
        id: eventId
      }
    ])
  }))
})
