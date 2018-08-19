import { Container } from 'typedi'
import { WithoutId } from 'backend/app/common/WithoutId'
import { someString, someDate } from 'common/test/testUtils'
import { ConferenceNotificationScope } from 'common/domain/ConferenceNotificationScope'
import { ConferenceNotificationRepository } from 'backend/app/conference/external/ConferenceNotificationRepository'
import { ConferenceNotification } from '../domain/ConferenceNotification'

type ConferenceNotificationProps = WithoutId<ConferenceNotification>

export function someConferenceNotificationProps(
  props: Partial<ConferenceNotificationProps>,
): ConferenceNotificationProps {
  return {
    ...props,
    message: someString(),
    scope: ConferenceNotificationScope.EVERYONE,
    timeSent: someDate(),
  }
}

export function givenThatAConferenceNotificationHasBeenSent(
  props: Partial<ConferenceNotificationProps> = {},
): Promise<ConferenceNotification> {
  return Container.get<ConferenceNotificationRepository>(
    ConferenceNotificationRepository,
  ).insert(someConferenceNotificationProps(props))
}
