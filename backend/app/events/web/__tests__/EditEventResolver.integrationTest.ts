import { someAdminUser, someOrdinaryUser } from 'common/test/testUtils'
import { withDb, execQuery } from 'backend/app/test/integrationTestUtils'
import {
  givenThatAnEventExists,
  givenThatAVenueExists,
  someCreateEventRequest,
} from 'backend/app/events/test/eventTestUtils'
import { EditEventRequest, CreateEventRequest } from 'backend/app/events/domain/Event'

import { AuthToken } from 'common/AuthToken'
import * as faker from 'faker'

describe('editEvent mutation', () => {
  describe('as an admin user', () => {
    it(
      'modifies name, introduction, detail and venue of an event',
      withDb(async () => {

        const venueOrig = await givenThatAVenueExists()
        const eventOrig = await givenThatAnEventExists({venue: venueOrig.id})

        const editedName = eventOrig.name + faker.lorem.words(1)
        const editedIntroduction = eventOrig.introduction + faker.lorem.words(1)
        const editedDetail = eventOrig.detail + faker.lorem.words(1)
        
        const venueEdit = await givenThatAVenueExists()
        const eventEditReq = {name:editedName,introduction:editedIntroduction,detail:editedDetail,venue: venueEdit.id}
        
        
        await editEvent({
          request: {
            id: eventOrig.id,
            ...eventEditReq
          },
          user: someAdminUser,
        },)
        
        const editedEvent = await execQuery(`
      {
        event(id: "${eventOrig.id}") {
          id
          name
          introduction
          detail
          venue {
            id
          }
        }
      }`)
      
      expect(editedEvent.event).toEqual(expect.objectContaining({
        name: eventEditReq.name,
        introduction: eventEditReq.introduction,
        detail: eventEditReq.detail,
        venue: {id:eventEditReq.venue},
      }));

    }),
    )
  })})

async function editEvent(props: {
  request: EditEventRequest
  user?: AuthToken
}) {
  return execQuery<{ request: EditEventRequest }>({
    body: `
    mutation EditEvent($request: EditEventRequest) {
      editEvent(request: $request)
    }
  `,
    variables: {
      request: props.request,
    },
    user: props.user,
  })
}


