import { withDb, execQuery } from 'backend/app/test/integrationTestUtils'
import { EventFamily } from 'common/domain/EventFamily'
import { givenThatAnEventAttendanceExists } from 'backend/app/conference/test/conferenceTestUtils'
import { givenThatAnEventExists } from 'backend/app/events/test/eventTestUtils'
import { givenThatAUserExists } from 'backend/app/user/test/userTestUtils'

describe('User.conferenceEvents', () => {
  it(
    'returns events for the user',
    withDb(async () => {
      const userId = (await givenThatAUserExists()).id
      const event = await givenThatAnEventExists({
        family: EventFamily.TWT_2018,
      })

      const { user } = await userConferenceEvents(userId)

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

  it(
    'returns events that the user is attending',
    withDb(async () => {
      const attendance = await givenThatAnEventAttendanceExists()

      const { user } = await eventsAttending(attendance.user)

      expect(user).toMatchObject({
        eventsAttending: [{ id: attendance.event }],
      })
    }),
  )

  it(
    'returns votes (and only votes) for the user when votes requested',
    withDb(async () => {
      const vote = await givenThatAnEventExists({
        family: EventFamily.LABOUR_2018_VOTE,
      })
      await givenThatAnEventExists({
        family: EventFamily.LABOUR_2018,
      })
      await givenThatAnEventExists({
        family: EventFamily.TWT_2018,
      })

      const userId = (await givenThatAUserExists({ isDelegate: true })).id
      const { user } = await userConferenceVotes(userId)

      expect(user).toMatchObject({
        conferenceVotes: {
          edges: [
            {
              node: { id: vote.id },
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

async function userConferenceVotes(userId: string) {
  return execQuery({
    body: `
      query($id: String!) {
        user(id: $id) {
          conferenceVotes {
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

async function eventsAttending(userId: string) {
  return execQuery({
    body: `
      query($id: String!) {
        user(id: $id) {
          eventsAttending {
            id
          }
        }
      }
    `,
    variables: { id: userId },
  })
}
