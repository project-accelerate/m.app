import { withDb, execQuery } from 'backend/app/test/integrationTestUtils'
import {
  givenThatAConferenceAttendanceExists,
  givenThatAnEventAttendanceExists,
} from 'backend/app/conference/test/conferenceTestUtils'
import { givenThatAConferenceNotificationHasBeenSent } from 'backend/app/conference/test/conferenceNotificationTestUtils'
import { AuthToken } from 'common/AuthToken'
import { someAdminUser, someOrdinaryUser } from 'common/test/testUtils'

describe('sentNotifications', () => {
  describe('when authenticated as admin', () => {
    it(
      'returns all sent notifications',
      withDb(async () => {
        const notification = await givenThatAConferenceNotificationHasBeenSent()
        const { sentNotifications } = await querySentNotifications(
          someAdminUser,
        )

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
  describe('when authenticated as ordinary user', () => {
    it(
      'throws error',
      withDb(async () => {
        await givenThatAConferenceNotificationHasBeenSent()
        await expect(querySentNotifications(someOrdinaryUser)).rejects.toThrow()
      }),
    )
  })
  describe('when not authenticated', () => {
    it(
      'throws error',
      withDb(async () => {
        await givenThatAConferenceNotificationHasBeenSent()
        await expect(querySentNotifications()).rejects.toThrow()
      }),
    )
  })
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
