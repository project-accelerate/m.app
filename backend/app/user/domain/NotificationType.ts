import { registerEnumType } from 'type-graphql'

export enum NotificationType {
  MOBILE_PUSH,
}

registerEnumType(NotificationType, {
  name: 'NotificationType',
})
