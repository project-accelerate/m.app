import { Container } from 'typedi'
import { someUuid } from 'common/test/testUtils'
import { ConferenceId } from 'backend/app/conference/domain/Conference'
import { WithoutId } from 'backend/app/common/WithoutId'
import { givenThatAUserExists } from 'backend/app/user/test/userTestUtils'
import { ConferenceAttendanceRepository } from '../external/ConferenceAttendanceRepository'
import { ConferenceAttendance } from '../domain/ConferenceAttendance'

type ConferenceAttendanceProps = WithoutId<ConferenceAttendance>

export function someConferenceId() {
  return ConferenceId.TWT_2018
}

export function someOtherConferenceId() {
  return ConferenceId.LABOUR_2018
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
