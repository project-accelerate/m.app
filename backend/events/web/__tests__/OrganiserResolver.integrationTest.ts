import { withDb, execQuery } from '../../../test/integrationTestUtils'
import {
  givenThatAnOrganiserExists,
  someEventProps,
} from '../../test/eventTestUtils'

describe('OrganiserResolver', () => {
  describe('.createOrganiser', () => {
    it(
      'looks up organisers by id',
      withDb(async () => {
        const organiserId = await givenThatAnOrganiserExists({ name: 'foo' })
        const result = await execQuery(`
        {
          organiser(id: "${organiserId}") {
            name
          }
        }
      `)

        expect(result.organiser).toMatchObject({
          name: 'foo',
        })
      }),
    )
  })
})
