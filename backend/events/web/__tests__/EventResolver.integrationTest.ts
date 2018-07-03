import { someGeoPoint } from '../../../../common/test/testUtils'
import { withDb, execQuery } from '../../../test/integrationTestUtils'
import {
  givenThatAnEventExists,
  givenThatAVenueExists,
  givenThatAPersonExists,
} from '../../test/eventTestUtils'
import { EventFeedArgs } from '../EventResolver'
import { addDays } from 'date-fns'

describe('EventResolver', () => {
  it(
    'looks up events by id, returning associated objects',
    withDb(async () => {
      const venue = await givenThatAVenueExists()
      const organiser = await givenThatAPersonExists()
      const event = await givenThatAnEventExists({
        venue: venue.id,
        organiser: organiser.id,
      })

      const result = await execQuery(`
      {
        event(id: "${event.id}") {
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
        id: event.id,
        venue: {
          id: venue.id,
        },
        organiser: {
          id: organiser.id,
        },
      })
    }),
  )

  it(
    'finds nearby upcoming events',
    withDb(async () => {
      // Location is the long/lat coordinates of the postcode
      const postcode = 'OX49 5NU'
      const location = someGeoPoint(-1.06986930435083, 51.656143706615)

      const event = await givenThatAnEventExists({
        location,
        startTime: addDays(new Date(), 2),
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
          postcode,
        },
      })

      expect(result.eventFeed).toMatchObject([
        {
          id: event.id,
        },
      ])
    }),
  )
})
