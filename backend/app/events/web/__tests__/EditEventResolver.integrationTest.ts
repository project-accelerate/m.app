import { someAdminUser, someOrdinaryUser } from 'common/test/testUtils'
import { withDb, execQuery } from 'backend/app/test/integrationTestUtils'
import {
  someEditEventRequest,
  givenThatAnEventExists,
  givenThatAVenueExists,
} from 'backend/app/events/test/eventTestUtils'
import { EditEventRequest } from 'backend/app/events/domain/Event'

import { AuthToken } from 'common/AuthToken'

describe('editEvent mutation', () => {
  describe('as an admin user', () => {
    it(
      'creates the event and returns it',
      withDb(async () => {
        var introductionText = "TEST"
        var editedText = introductionText + "1"
        const venue = await givenThatAVenueExists()
        const eventTest = await givenThatAnEventExists({venue:venue.id,introduction:editedText})
        
        await editEvent({
          request: {
            id: eventTest.id,
            introduction: editedText
          },
          user: someAdminUser,
        })
        const result = await execQuery(`
      {
        event(id: "${eventTest.id}") {
          id
          introduction
          venue {
            id
          }
        }
      }`)
     
      expect(result.introduction).toMatch(editedText)
    }),
    )
  })})



async function editEvent(props: {
  request: Partial<EditEventRequest>
  user?: AuthToken
}) {
  return execQuery<{ request: EditEventRequest }>({
    body: `
    mutation EditEvent($request: EditEventRequest) {
      editEvent(request: $request)
    }
  `,
    variables: {
      request: someEditEventRequest(props.request),
    },
    user: props.user,
  })
}


