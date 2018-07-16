import { withDb, execQuery } from '../../../test/integrationTestUtils'
import { givenThatAPersonExists } from '../../test/eventTestUtils'

describe('PersonResolver', () => {
  describe('.person', () => {
    it(
      'looks up people by id',
      withDb(async () => {
        const person = await givenThatAPersonExists({ name: 'foo' })
        const result = await execQuery(`
        {
          person(id: "${person.id}") {
            name
          }
        }
      `)

        expect(result.person).toMatchObject({
          name: 'foo',
        })
      }),
    )
  })

  describe('.allPeople', () => {
    it(
      'returns all people',
      withDb(async () => {
        await givenThatAPersonExists({ name: '1' })
        await givenThatAPersonExists({ name: '2' })

        const result = await execQuery(`
      {
        allPeople {
          total
          edges {
            node {
              name
            }
          }
        }
      }
      `)

        expect(result.allPeople).toMatchObject({
          total: 2,
          edges: [{ node: { name: '1' } }, { node: { name: '2' } }],
        })
      }),
    )
  })
})
