import {
  someString,
  somePostcode,
  someDate,
  someAdminUser,
  someOrdinaryUser,
} from '../../../../common/test/testUtils'
import { withDb, execQuery } from '../../../test/integrationTestUtils'
import {
  givenThatAnEventExists,
  givenThatAVenueExists,
  givenThatAnOrganiserExists,
  someEventProps,
  someCreateEventRequest,
} from '../../test/eventTestUtils'
import { CreateEventRequest } from '../../domain/Event'
import { AuthToken } from '../../../../common/AuthToken'

describe('createEvent mutation', () => {
  describe('as an admin user', () => {
    it(
      'creates the event and returns it',
      withDb(async () => {
        const venue = await givenThatAVenueExists()
        const organiser = await givenThatAnOrganiserExists()
        const result = await createEvent({
          request: {
            name: 'my-event',
            venue,
            organiser,
          },
          user: someAdminUser,
        })

        expect(result.createEvent).toMatchObject({
          name: 'my-event',
        })
      }),
    )
  })

  describe('as an ordinary user', () => {
    it(
      'rejects the request',
      withDb(async () => {
        const venue = await givenThatAVenueExists()
        const organiser = await givenThatAnOrganiserExists()
        const result = createEvent({
          request: {
            name: 'my-event',
            venue,
            organiser,
          },
          user: someOrdinaryUser,
        })

        await expect(result).rejects.toThrow()
      }),
    )
  })
})

async function createEvent(props: {
  request: Partial<CreateEventRequest>
  user?: AuthToken
}) {
  return execQuery<{ request: CreateEventRequest }>({
    body: `
    mutation($request: CreateEventRequest) {
      createEvent(request: $request) {
        name
        venue {
          name
        }
        organiser {
          name
        }
      }
    }
  `,
    variables: {
      request: someCreateEventRequest(props.request),
    },
    user: props.user,
  })
}
