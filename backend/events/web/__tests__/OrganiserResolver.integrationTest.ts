import { withDb, execQuery } from '../../../test/integrationTestUtils'
import {
  givenThatAnOrganiserExists,
  someEventProps,
} from '../../test/eventTestUtils'

describe('OrganiserResolver', () => {
  describe('.organiser', () => {
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

  describe('.allOrganisers', () => {
    it(
      'returns all organisers',
      withDb(async () => {
        await givenThatAnOrganiserExists({ name: '1' })
        await givenThatAnOrganiserExists({ name: '2' })

        const result = await execQuery(`
      {
        allOrganisers {
          total
          edges {
            node {
              name
            }
          }
        }
      }
      `)

        expect(result.allOrganisers).toMatchObject({
          total: 2,
          edges: [{ node: { name: '1' } }, { node: { name: '2' } }],
        })
      }),
    )
  })
})
