import { WithoutId } from "backend/app/common/WithoutId";
import { someUuid, someDate } from "common/test/testUtils";
import { PendingNotificationRepository } from "../external/PendingNotificationRepository";
import { PendingNotification } from "../domain/PendingNotification";
import { givenThatADeviceExists } from "./deviceTestUtils";

type PendingNotificationProps = WithoutId<PendingNotification>

export function somePendingNotification(props: Partial<PendingNotification> = {}): PendingNotification {
  return {
    id: someUuid(),
    timeSent: someDate(),
    ticketId: someUuid(),
    deviceId: someUuid(),
    ...props,
  }
}

export async function givenThatAPendingNotificationExists(props: Partial<PendingNotificationProps> = {}) {
  return new PendingNotificationRepository().insert(
    somePendingNotification({
      ...props,
      deviceId: props.deviceId || (await givenThatADeviceExists()).id
    })
  )
}
