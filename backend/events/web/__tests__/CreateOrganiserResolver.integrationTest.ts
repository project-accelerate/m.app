import { readFileSync } from 'fs'
import { join } from 'path'
import { withDb, execQuery } from 'backend/test/integrationTestUtils'
import { CreateOrganiserRequest } from 'backend/events/domain/Organiser'
import { someString } from 'common/test/testUtils'

const imageData = readFileSync(join(__dirname, 'image.png')).toString('base64')

describe('CreateOrganiserResolver', () => {
  it(
    'creates the organiser with profile pic',
    withDb(async () => {
      const result = await execQuery<{ req: CreateOrganiserRequest }>({
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
            bio: 'mybio',
            name: 'myname',
            photoData: imageData,
          },
        },
      })

      expect(result.createOrganiser).toMatchObject({
        id: expect.stringContaining('-'),
        name: 'myname',
        bio: 'mybio',
        photo: {
          sourceUrl: expect.stringContaining('://'),
        },
      })
    }),
  )
})
