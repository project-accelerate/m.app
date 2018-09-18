import { withDb, execQuery } from 'backend/app/test/integrationTestUtils'
import { RegisterConferenceAttendanceRequest } from 'backend/app/conference/domain/ConferenceAttendance'
import { DeviceType } from 'backend/app/device/domain/Device'

describe('registerConferenceAttendance mutation', () => {
  it(
    'registers the conference attendance and returns it',
    withDb(async () => {
      const { registration } = await registerConferenceAttendance({
        device: {
          deviceToken: 'my-device-token',
          deviceType: DeviceType.ANDROID,
        },
        user: {
          optedIntoNotifications: true,
          isDelegate: true,
        },
      })

      expect(registration).toMatchObject({
        user: {
          id: expect.any(String),
          isDelegate: true,
        },
        device: {
          id: expect.any(String),
          deviceToken: 'my-device-token',
          deviceType: DeviceType.ANDROID,
        },
      })
    }),
  )
})

async function registerConferenceAttendance(
  request: RegisterConferenceAttendanceRequest,
) {
  return execQuery<{ request: RegisterConferenceAttendanceRequest }>({
    body: `
      mutation($request: RegisterConferenceAttendanceRequest) {
        registration: registerConferenceAttendance(request: $request) {
          user {
            isDelegate
            id
          }
          device {
            id
            deviceToken
            deviceType
          }
        }
      }
    `,
    variables: { request },
  })
}
