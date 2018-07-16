import { readFileSync } from 'fs'
import { join } from 'path'
import { withDb, execQuery } from '../../../test/integrationTestUtils'
import { CreatePersonRequest } from '../../domain/Person'
import {
  someString,
  someAdminUser,
  someOrdinaryUser,
} from 'common/test/testUtils'
import { AuthToken } from 'common/AuthToken'
import { someImageUpload } from '../../../test/testUtils'

const imageData = readFileSync(
  require.resolve('common/test/somePhoto.jpg'),
).toString('base64')

describe('CreatePersonResolver', () => {
  describe('as an admin user', () => {
    it(
      'creates the person',
      withDb(async () => {
        const result = await createPerson({
          request: {
            name: 'my-name',
            bio: 'my-bio',
            photoUpload: someImageUpload(),
          },
          user: someAdminUser,
        })

        expect(result.createPerson).toMatchObject({
          id: expect.stringContaining('-'),
          name: 'my-name',
          bio: 'my-bio',
          photo: {
            sourceUrl: expect.stringContaining('://'),
          },
        })
      }),
    )
  })

  describe('as an ordinary user', () => {
    it(
      'rejects the request',
      withDb(async () => {
        const result = createPerson({
          request: {
            name: 'my-name',
            bio: 'my-bio',
            photoUpload: someImageUpload(),
          },
          user: someOrdinaryUser,
        })

        await expect(result).rejects.toThrow()
      }),
    )
  })
})

export function createPerson(props: {
  request: Partial<CreatePersonRequest>
  user?: AuthToken
}) {
  return execQuery<{ req: CreatePersonRequest }>({
    body: `
    mutation CreatePerson($req: CreatePersonRequest){
      createPerson(request: $req) {
        id
        name
        bio
        photo {
          sourceUrl
        }
      }
    }
  `,
    variables: {
      req: {
        name: someString(),
        ...props.request,
      },
    },
    user: props.user,
  })
}
