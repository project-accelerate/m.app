import { never } from 'common/util'

export enum ConferenceNotificationScope {
  EVERYONE = 'EVERYONE',
  DELEGATES = 'DELEGATES',
}

export const allConferenceNotificationScopes = Object.keys(
  ConferenceNotificationScope,
).map(
  (key: any) => ConferenceNotificationScope[key] as ConferenceNotificationScope,
)

export function getConferenceNotificationScopeLabel(
  scope: ConferenceNotificationScope,
) {
  if (scope === ConferenceNotificationScope.EVERYONE) {
    return 'Everyone'
  }
  if (scope === ConferenceNotificationScope.DELEGATES) {
    return 'Just Delegates'
  }

  return never(scope)
}
