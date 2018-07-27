import { withDb, execQuery } from 'backend/app/test/integrationTestUtils'
import { RegisterConferenceAttendanceRequest } from 'backend/app/conference/domain/ConferenceAttendance'
import { DeviceType } from 'backend/app/user/domain/Device'
import { EventFamily } from 'common/domain/EventFamily'
import { givenThatAConferenceAttendanceExists } from 'backend/app/conference/test/conferenceTestUtils'
import { givenThatAnEventExists } from 'backend/app/events/test/eventTestUtils'

describe('User.conferenceEvents', () => {
  it(
    'returns events for the user',
    withDb(async () => {
      const attendance = await givenThatAConferenceAttendanceExists()
      const event = await givenThatAnEventExists({
        family: attendance.conference,
      })

      const { user } = await userConferenceEvents(attendance.attendee)

      expect(user).toMatchObject({
        conferenceEvents: {
          edges: [
            {
              node: { id: event.id },
            },
          ],
        },
      })
    }),
  )
})

async function userConferenceEvents(userId: string) {
  return execQuery({
    body: `
      query($id: String!) {
        user(id: $id) {
          conferenceEvents {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `,
    variables: { id: userId },
  })
}
