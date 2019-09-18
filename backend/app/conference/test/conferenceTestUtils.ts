import { Container } from 'typedi'
import { someUuid } from 'common/test/testUtils'
import { WithoutId } from 'backend/app/common/WithoutId'
import { givenThatAUserExists } from 'backend/app/user/test/userTestUtils'
import { EventFamily } from 'common/domain/EventFamily'
import { EventAttendance } from 'backend/app/conference/domain/EventAttendance'
import { EventAttendanceRepository } from 'backend/app/conference/external/EventAttedanceRepository'
import { givenThatAnEventExists } from 'backend/app/events/test/eventTestUtils'

type EventAttendanceProps = WithoutId<EventAttendance>

export function someConferenceId() {
  return EventFamily.TWT
}

export function someEventAttendanceProps(
  props: Partial<EventAttendanceProps> = {},
): EventAttendanceProps {
  return {
    event: someUuid(),
    user: someUuid(),
    ...props,
  }
}

export function someOtherEventAttendanceProps(
  props: Partial<EventAttendanceProps> = {},
): EventAttendanceProps {
  return {
    event: someUuid(),
    user: someUuid(),
    ...props,
  }
}

export async function givenThatAnEventAttendanceExists({
  event,
  user,
}: Partial<EventAttendanceProps> = {}): Promise<EventAttendance> {
  return Container.get(EventAttendanceRepository).insert({
    event: event || (await givenThatAnEventExists()).id,
    user: user || (await givenThatAUserExists()).id,
  })
}
