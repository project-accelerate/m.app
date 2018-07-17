import { Container } from 'typedi'
import { someUuid } from 'common/test/testUtils'
import { WithoutId } from 'backend/app/common/WithoutId'
import { givenThatAUserExists } from 'backend/app/user/test/userTestUtils'
import { ConferenceAttendanceRepository } from '../external/ConferenceAttendanceRepository'
import { ConferenceAttendance } from '../domain/ConferenceAttendance'
import { EventFamily } from 'common/domain/EventFamily'

type ConferenceAttendanceProps = WithoutId<ConferenceAttendance>

export function someConferenceId() {
  return EventFamily.TWT_2018
}

export function someOtherConferenceId() {
  return EventFamily.LABOUR_2018
}

export function someConferenceAttendanceProps(
  props: Partial<ConferenceAttendanceProps> = {},
): ConferenceAttendanceProps {
  return {
    attendee: someUuid(),
    conference: someConferenceId(),
    ...props,
  }
}

export async function givenThatAConferenceAttendanceExists({
  attendee,
  ...props
}: Partial<ConferenceAttendanceProps> = {}): Promise<ConferenceAttendance> {
  return Container.get(ConferenceAttendanceRepository).insert(
    someConferenceAttendanceProps({
      attendee: attendee || (await givenThatAUserExists()).id,
      ...props,
    }),
  )
}
