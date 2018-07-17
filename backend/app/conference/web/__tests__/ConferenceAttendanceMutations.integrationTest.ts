import { withDb, execQuery } from 'backend/app/test/integrationTestUtils'
import { RegisterConferenceAttendanceRequest } from 'backend/app/conference/domain/ConferenceAttendance'
import { DeviceType } from 'backend/app/user/domain/Device'
import { EventFamily } from 'common/domain/EventFamily'

describe('registerConferenceAttendance mutation', () => {
  it(
    'registers the conference attendance and returns it',
    withDb(async () => {
      const { attendances } = await registerConferenceAttendance({
        attendances: [EventFamily.LABOUR_2018],
        device: {
          deviceToken: 'my-device-token',
          deviceType: DeviceType.ANDROID,
        },
        user: {
          optedIntoNotifications: true,
        },
      })

      expect(attendances).toMatchObject([
        {
          conference: EventFamily.LABOUR_2018,
          attendee: {
            id: expect.any(String),
            devices: [
              {
                id: expect.any(String),
                deviceToken: 'my-device-token',
                deviceType: DeviceType.ANDROID,
              },
            ],
          },
        },
      ])
    }),
  )
})

async function registerConferenceAttendance(
  request: RegisterConferenceAttendanceRequest,
) {
  return execQuery<{ request: RegisterConferenceAttendanceRequest }>({
    body: `
      mutation($request: RegisterConferenceAttendanceRequest) {
        attendances: registerConferenceAttendance(request: $request) {
          conference
          attendee {
            id
            devices {
              id
              deviceToken
              deviceType
            }
          }
        }
      }
    `,
    variables: { request },
  })
}
