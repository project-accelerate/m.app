import { Container } from 'typedi'
import { WithoutId } from 'backend/app/common/WithoutId'
import { someString, someDate, someUuid, someBool } from 'common/test/testUtils'
import { ConferenceNotificationScope } from 'common/domain/ConferenceNotificationScope'
import { ConferenceNotificationRepository } from 'backend/app/conference/external/ConferenceNotificationRepository'
import {
  ConferenceNotification,
  ConferenceNotificationSendRequest,
} from '../domain/ConferenceNotification'

type ConferenceNotificationProps = WithoutId<ConferenceNotification>

export function someConferenceNotificationSendRequest(
  props: Partial<ConferenceNotificationSendRequest> = {},
): ConferenceNotificationSendRequest {
  return {
    message: someString(),
    scope: ConferenceNotificationScope.EVERYONE,
    associatedEventId: someUuid(),
    title: someString(),
    link: someString(),
    urgent: someBool(),
    ...props,
  }
}

export function someConferenceNotificationProps(
  props: Partial<ConferenceNotificationProps> = {},
): ConferenceNotificationProps {
  return {
    message: someString(),
    scope: ConferenceNotificationScope.EVERYONE,
    timeSent: someDate(),
    associatedEventId: someUuid(),
    title: someString(),
    link: someString(),
    urgent: someBool(),
    ...props,
  }
}

export function givenThatAConferenceNotificationHasBeenSent(
  props: Partial<ConferenceNotificationProps> = {},
): Promise<ConferenceNotification> {
  return Container.get<ConferenceNotificationRepository>(
    ConferenceNotificationRepository,
  ).insert(someConferenceNotificationProps(props))
}
