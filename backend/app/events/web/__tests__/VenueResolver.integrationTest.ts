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
        const venue = await givenThatAVenueExists({ name: 'foo' })
        const result = await execQuery(`
        {
          venue(id: "${venue.id}") {
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
