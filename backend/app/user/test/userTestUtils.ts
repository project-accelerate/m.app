import { Container } from 'typedi'
import { someUuid, someBool, someString } from 'common/test/testUtils'
import { UserRepository } from '../external/UserRepository'
import { User, UserProps } from '../domain/User'

export function someUserProps(props: Partial<UserProps> = {}): UserProps {
  return {
    optedIntoNotifications: someBool(),
    email: someString(),
    isDelegate: true,
    consentToContact: true,
    ...props,
  }
}

export function someUser(props: Partial<User> = {}): User {
  return Object.assign(new User(), { id: someUuid() }, props)
}

export async function givenThatAUserExists(
  props: Partial<UserProps> = {},
): Promise<User> {
  return Container.get(UserRepository).insert(someUserProps(props))
}
