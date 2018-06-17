import { withDb, execQuery } from '../../../test/integrationTestUtils'
import {
  givenThatAVenueExists,
  someEventProps,
} from '../../test/eventTestUtils'

describe('VenueResolver', () => {
  describe('.createVenue', () => {
    it(
      'looks up venues by id',
      withDb(async () => {
        const venueId = await givenThatAVenueExists({ name: 'foo' })
        const result = await execQuery(`
        {
          venue(id: "${venueId}") {
            name
          }
        }
      `)

        expect(result.venue).toMatchObject({
          name: 'foo',
        })
      }),
    )
  })
})
