import { withDb, execQuery } from 'backend/app/test/integrationTestUtils'
import { RegisterConferenceAttendanceRequest } from 'backend/app/conference/domain/ConferenceAttendance'
import { DeviceType } from 'backend/app/device/domain/Device'
import { EventFamily } from 'common/domain/EventFamily'

describe('registerConferenceAttendance mutation', () => {
  it(
    'registers the conference attendance and returns it',
    withDb(async () => {
      const { registration } = await registerConferenceAttendance({
        attendances: [EventFamily.LABOUR_2018],
        device: {
          deviceToken: 'my-device-token',
          deviceType: DeviceType.ANDROID,
        },
        user: {
          optedIntoNotifications: true,
        },
      })

      expect(registration).toMatchObject({
        attendances: [
          {
            id: expect.any(String),
            conference: EventFamily.LABOUR_2018,
          },
        ],
        user: {
          id: expect.any(String),
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
          attendances {
            id
            conference
          }
          user {
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
