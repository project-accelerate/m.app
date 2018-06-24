import { readFileSync } from 'fs'
import { join } from 'path'
import { withDb, execQuery } from 'backend/test/integrationTestUtils'
import { CreateOrganiserRequest } from 'backend/events/domain/Organiser'
import {
  someString,
  someAdminUser,
  someOrdinaryUser,
} from 'common/test/testUtils'
import { AuthToken } from 'common/AuthToken'

const imageData = readFileSync(join(__dirname, 'image.png')).toString('base64')

describe('CreateOrganiserResolver', () => {
  describe('as an admin user', () => {
    it(
      'creates the organiser',
      withDb(async () => {
        const result = await createOrganiser({
          request: {
            name: 'my-name',
            bio: 'my-bio',
            photoData: imageData,
          },
          user: someAdminUser,
        })

        expect(result.createOrganiser).toMatchObject({
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
        const result = createOrganiser({
          request: {
            name: 'my-name',
            bio: 'my-bio',
            photoData: imageData,
          },
          user: someOrdinaryUser,
        })

        await expect(result).rejects.toThrow()
      }),
    )
  })
})

export function createOrganiser(props: {
  request: Partial<CreateOrganiserRequest>
  user?: AuthToken
}) {
  return execQuery<{ req: CreateOrganiserRequest }>({
    body: `
    mutation CreateOrganiser($req: CreateOrganiserRequest){
      createOrganiser(request: $req) {
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
