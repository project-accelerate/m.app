import { ExpoPushMessage, ExpoPushReceipt } from "expo-server-sdk";
import { someUuid, someString } from "common/test/testUtils";

export function somePushNotification(props: Partial<ExpoPushMessage> = {}): ExpoPushMessage {
  return {
    ...props,
    to: someUuid()
  }
}

type ExpoPushSuccessReceipt = {
  status: 'ok'
  details?: Object
};

export function someSuccessfulPushNotificationReceipt(props: Partial<ExpoPushSuccessReceipt> = {}): ExpoPushReceipt {
  return {
    status: 'ok',
    ...props,
  }
}

type ExpoPushErrorReceipt = {
  status: 'error'
  message: any
  details?: {
    error?: 'DeviceNotRegistered' | 'InvalidCredentials' | 'MessageTooBig' | 'MessageRateExceeded',
  },
};

export function someFailedPushNotificationReceipt(props: Partial<ExpoPushErrorReceipt> = {}): ExpoPushReceipt {
  return {
    status: 'error',
    message: someString(),
    ...props,
  }
}
