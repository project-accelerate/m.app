import { mock, spy, instance, when, verify } from 'ts-mockito'
import { sign } from 'jsonwebtoken'
import { TokenManager } from '../TokenManager'
import { AuthToken } from 'common/AuthToken'
import { someAuthTokenPayload } from 'common/test/testUtils'

describe('TokenManager', () => {
  it('should initialize without token if none is saved in localStorage', () => {
    const fixture = new Fixture()

    expect(fixture.manager.current.authProps).toBeUndefined()
  })

  it('should read saved jwt from localStorage on load', () => {
    const token = someAuthTokenPayload()
    const fixture = Fixture.withSavedToken(token)

    expect(fixture.manager.current.authProps).toMatchObject(token)
  })

  it('should provide new auth credentials on setting token', () => {
    const fixture = new Fixture()
    const newToken = someAuthTokenPayload({ sub: 'me' })

    fixture.manager.setToken(sign(newToken, 'my-secret'))

    expect(fixture.manager.current.authProps).toMatchObject(newToken)
  })

  it('when new token is provided, should save token in local storage', () => {
    const fixture = new Fixture()
    const newToken = sign(someAuthTokenPayload({ sub: 'me' }), 'my-secret')

    fixture.manager.setToken(newToken)

    verify(fixture.storage.setItem('auth_token', newToken)).called()
  })

  it('when new token is undefined, should remove token from local storage', () => {
    const fixture = new Fixture()

    fixture.manager.setToken(undefined)

    verify(fixture.storage.removeItem('auth_token')).called()
  })

  it('should notify change on setting token', () => {
    const fixture = new Fixture()
    const newToken = someAuthTokenPayload({ sub: 'me' })

    const onChange = jest.fn()
    fixture.manager.on('change', onChange)

    fixture.manager.setToken(sign(newToken, 'my-secret'))

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        authProps: expect.objectContaining(newToken),
      }),
    )
  })
})

class Fixture {
  static withSavedToken(token = someAuthTokenPayload()) {
    const storage = mockStorage()

    when(storage.getItem('auth_token')).thenReturn(sign(token, 'my-secret'))

    return new Fixture(storage)
  }

  constructor(public storage = mockStorage()) {}

  manager = new TokenManager(instance(this.storage))
}

function mockStorage() {
  return spy({
    getItem: (key: string) => '',
    setItem: (key: string, value: string) => {},
    removeItem: (key: string) => {},
  })
}
