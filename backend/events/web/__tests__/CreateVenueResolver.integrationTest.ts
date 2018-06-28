import { readFileSync } from 'fs'
import { withDb, execQuery } from '../../../test/integrationTestUtils'
import { CreateVenueRequest } from '../../domain/Venue'
import {
  someAdminUser,
  someOrdinaryUser,
} from '../../../../common/test/testUtils'
import { AuthToken } from '../../../../common/AuthToken'
import { someCreateVenueRequest } from '../../test/eventTestUtils'

describe('CreateVenueResolver', () => {
  describe('as an admin user', () => {
    it(
      'creates the venue',
      withDb(async () => {
        const result = await createVenue({
          request: {
            name: 'my-name',
          },
          user: someAdminUser,
        })

        expect(result.createVenue).toMatchObject({
          name: 'my-name',
        })
      }),
    )
  })

  describe('as an ordinary user', () => {
    it(
      'rejects the request',
      withDb(async () => {
        const result = createVenue({
          request: {
            name: 'my-name',
          },
          user: someOrdinaryUser,
        })

        await expect(result).rejects.toThrow()
      }),
    )
  })
})

export function createVenue(props: {
  request: Partial<CreateVenueRequest>
  user?: AuthToken
}) {
  return execQuery<{ req: CreateVenueRequest }>({
    body: `
    mutation CreateVenue($req: CreateVenueRequest){
      createVenue(request: $req) {
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
        ...someCreateVenueRequest(),
        ...props.request,
      },
    },
    user: props.user,
  })
}
