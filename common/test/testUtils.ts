import uuid from 'uuid'
import { Point } from 'geojson'
import { AuthToken } from 'common/AuthToken'
import { Role } from 'common/domain/Role'

export const someBuffer = () => new Buffer('1234')
export const someString = () => 'Foo'
export const someUuid = uuid
export const someDate = () => new Date('2010-01-01')
export const somePostcode = () => 'OX49 5NU'
export const someOutcode = () => 'OX49'
export const someInt = () => 1
export const someGeoPoint = (lat = 5, long = 13): Point => ({
  type: 'Point',
  coordinates: [lat, long],
})
export const farFutureTimestamp = () => 25_3010_3809

export const someAuthTokenPayload = (
  token: Partial<AuthToken> = {},
): AuthToken => ({
  sub: someUuid(),
  exp: farFutureTimestamp(),
  'http://peoplesmomentum.com/roles': [],
  ...token,
})

export const someAuthTokenWithRoles = (...roles: Role[]) =>
  someAuthTokenPayload({
    'http://peoplesmomentum.com/roles': roles,
  })

export const someAdminUser = someAuthTokenWithRoles(Role.ADMIN)
export const someOrdinaryUser = someAuthTokenWithRoles()

export const someSyntheticEvent = (props: any = {}) => ({
  ...props,
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
})

export const someSyntheticEventWithValue = (value: any) =>
  someSyntheticEvent({
    currentTarget: { value },
  })
