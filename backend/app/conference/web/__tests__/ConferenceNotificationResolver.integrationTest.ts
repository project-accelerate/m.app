import { withDb, execQuery } from 'backend/app/test/integrationTestUtils'
import { givenThatAnEventAttendanceExists } from 'backend/app/conference/test/conferenceTestUtils'
import { givenThatAConferenceNotificationHasBeenSent } from 'backend/app/conference/test/conferenceNotificationTestUtils'
import { AuthToken } from 'common/AuthToken'
import { someAdminUser, someOrdinaryUser } from 'common/test/testUtils'

describe('sentNotifications', () => {
  it(
    'returns all sent notifications',
    withDb(async () => {
      const notification = await givenThatAConferenceNotificationHasBeenSent()
      const { sentNotifications } = await querySentNotifications()

      expect(sentNotifications).toMatchObject({
        edges: [
          {
            node: { id: notification.id },
          },
        ],
      })
    }),
  )
})

async function querySentNotifications(user?: AuthToken) {
  return execQuery({
    body: `
      {
        sentNotifications {
          edges {
            node {
              id
            }
          }
        }
      }
    `,
    user,
  })
}
