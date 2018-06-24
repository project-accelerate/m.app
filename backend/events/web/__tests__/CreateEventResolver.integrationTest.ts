import {
  someString,
  somePostcode,
  someDate,
  someAdminUser,
  someOrdinaryUser,
} from 'common/test/testUtils'
import { withDb, execQuery } from 'backend/test/integrationTestUtils'
import {
  givenThatAnEventExists,
  givenThatAVenueExists,
  givenThatAnOrganiserExists,
  someEventProps,
} from 'backend/events/test/eventTestUtils'
import { CreateEventRequest } from 'backend/events/domain/Event'
import { AuthToken } from 'common/AuthToken'
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants'

describe('createEvent mutation', () => {
  describe('as an admin user', () => {
    it(
      'creates the event and returns it',
      withDb(async () => {
        const result = await createEvent({
          request: {
            name: 'my-event',
            venueName: 'my-venue',
            organiserName: 'my-organiser',
          },
          user: someAdminUser,
        })

        expect(result.createEvent).toMatchObject({
          name: 'my-event',
          venue: {
            name: 'my-venue',
          },
          organiser: {
            name: 'my-organiser',
          },
        })
      }),
    )
  })

  describe('as an ordinary user', () => {
    it(
      'rejects the request',
      withDb(async () => {
        const result = createEvent({
          request: {
            name: 'my-event',
            venueName: 'my-venue',
            organiserName: 'my-organiser',
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
      request: {
        startTime: someDate(),
        endTime: someDate(),
        introduction: someString(),
        name: someString(),
        venueName: someString(),
        organiserName: someString(),
        postcode: somePostcode(),
        ...props.request,
      },
    },
    user: props.user,
  })
}
