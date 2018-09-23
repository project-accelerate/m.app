import { never } from 'common/util'

export enum ConferenceNotificationScope {
  TWT_ONLY = 'TWT_ONLY',
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
  if (scope === ConferenceNotificationScope.TWT_ONLY) {
    return 'Non-delegates'
  }

  return never(scope)
}
