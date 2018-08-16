import { withDb, execQuery } from 'backend/app/test/integrationTestUtils'
import { givenThatAnEventExists } from 'backend/app/events/test/eventTestUtils'
import { givenThatAUserExists } from 'backend/app/user/test/userTestUtils'
import { EventAttendanceRepository } from 'backend/app/conference/external/EventAttedanceRepository'
import { givenThatAnEventAttendanceExists } from 'backend/app/conference/test/conferenceTestUtils'

describe('Event.userIsAttending', () => {
  const eventAttendanceRepository = new EventAttendanceRepository()

  describe('when attends event', () => {
    it(
      'marks user as attending',
      withDb(async () => {
        const user = await givenThatAUserExists()
        const event = await givenThatAnEventExists()

        await attendEvent({
          eventId: event.id,
          userId: user.id,
        })

        expect(
          await eventAttendanceRepository.findOne({
            user: user.id,
            event: event.id,
          }),
        ).toBeTruthy()
      }),
    )
  })

  describe('when cancels event attendance', () => {
    it(
      'marks user as not attending',
      withDb(async () => {
        const attendance = await givenThatAnEventAttendanceExists()

        await cancelAttendance({
          eventId: attendance.event,
          userId: attendance.user,
        })

        expect(
          await eventAttendanceRepository.findOne({
            user: attendance.user,
            event: attendance.event,
          }),
        ).toBeFalsy()
      }),
    )
  })
})

async function attendEvent(variables: { eventId: string; userId: string }) {
  return execQuery({
    body: `
      mutation($eventId: String!, $userId: String!) {
        mutateUser(id: $userId) {
          attendEvent(eventId: $eventId) {
            id
          }
        }
      }
    `,
    variables,
  })
}

async function cancelAttendance(variables: {
  eventId: string
  userId: string
}) {
  return execQuery({
    body: `
      mutation($eventId: String!, $userId: String!) {
        mutateUser(id: $userId) {
          cancelAttendance(eventId: $eventId) {
            id
          }
        }
      }
    `,
    variables,
  })
}
