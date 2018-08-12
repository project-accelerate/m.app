import { withDb, execQuery } from 'backend/app/test/integrationTestUtils'
import { givenThatAnEventAttendanceExists } from 'backend/app/conference/test/conferenceTestUtils'
import { someUuid } from 'common/test/testUtils'
import { givenThatAnEventExists } from 'backend/app/events/test/eventTestUtils'

describe('Event.userIsAttending', () => {
  describe('when user is not attending', () => {
    it(
      'returns false',
      withDb(async () => {
        const { event } = await userConferenceEvents({
          eventId: (await givenThatAnEventExists()).id,
          userId: someUuid(),
        })

        expect(event.userIsAttending).toBeFalsy()
      }),
    )
  })

  describe('when user is attending', () => {
    it(
      'returns true',
      withDb(async () => {
        const attendance = await givenThatAnEventAttendanceExists()
        const { event } = await userConferenceEvents({
          eventId: attendance.event,
          userId: attendance.user,
        })

        expect(event.userIsAttending).toBeTruthy()
      }),
    )
  })
})

async function userConferenceEvents(variables: {
  eventId: string
  userId: string
}) {
  return execQuery({
    body: `
      query($eventId: String!, $userId: String!) {
        event(id: $eventId) {
          userIsAttending(userId: $userId)
        }
      }
    `,
    variables,
  })
}
