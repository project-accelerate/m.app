import {
  withDb,
  execQuery,
  waitUntil,
} from 'backend/app/test/integrationTestUtils'
import { ConferenceNotificationSendRequest } from 'backend/app/conference/domain/ConferenceNotification'
import { someConferenceNotificationSendRequest } from 'backend/app/conference/test/conferenceNotificationTestUtils'
import { Container } from 'typedi'
import { ConferenceNotificationRepository } from 'backend/app/conference/external/ConferenceNotificationRepository'
import { someAdminUser, someOrdinaryUser } from 'common/test/testUtils'
import { AuthToken } from 'common/AuthToken'
import { givenThatAUserExists } from 'backend/app/user/test/userTestUtils'
import { givenThatADeviceExists } from 'backend/app/device/test/deviceTestUtils'

describe('sendConferenceNotification mutation', () => {
  describe('when logged in as admin', () => {
    it(
      'sends the notification and records it as saved',
      withDb(async () => {
        await givenThatADeviceIsSubscribedToNotifications()

        await sendNotification(
          someConferenceNotificationSendRequest({ message: 'foo' }),
          someAdminUser,
        )

        const notificationRepository = await Container.get<
          ConferenceNotificationRepository
        >(ConferenceNotificationRepository)
        const record = await waitUntil(() => notificationRepository.findOne({}))

        expect(record).toMatchObject({
          message: 'foo',
        })
      }),
    )
  })

  describe('when logged in as ordinary user', () => {
    it(
      'rejects as unauthorized',
      withDb(async () => {
        await expect(
          sendNotification(
            someConferenceNotificationSendRequest({ message: 'foo' }),
            someOrdinaryUser,
          ),
        ).rejects.toThrow()
      }),
    )
  })

  describe('when not logged in', () => {
    it(
      'rejects as unauthorized',
      withDb(async () => {
        await expect(
          sendNotification(
            someConferenceNotificationSendRequest({ message: 'foo' }),
          ),
        ).rejects.toThrow()
      }),
    )
  })
})

async function givenThatADeviceIsSubscribedToNotifications() {
  const user = await givenThatAUserExists({ optedIntoNotifications: true })
  await givenThatADeviceExists({ owner: user.id })
}

async function sendNotification(
  request: ConferenceNotificationSendRequest,
  auth?: AuthToken,
) {
  return execQuery<{ request: ConferenceNotificationSendRequest }>({
    body: `
      mutation($request: ConferenceNotificationSendRequest) {
        notification: sendConferenceNotification(request: $request)
      }
    `,
    variables: { request },
    user: auth,
  })
}
