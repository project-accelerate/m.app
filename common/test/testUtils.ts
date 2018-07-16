import uuid from 'uuid'
import { Point } from 'geojson'
import { AuthToken } from '../AuthToken'
import { Role } from '../domain/Role'

export const someBuffer = () => new Buffer('1234')
export const someString = () => 'Foo'
export const someUuid = uuid
export const someBool = () => false
export const someOtherBool = () => true
export const someDate = () => new Date('2010-01-01')
export const somePostcode = () => 'OX49 5NU'
export const someOutcode = () => 'OX49'
export const someInt = () => 1
export const someGeoPoint = (lat = 5, lon = 13): Point => ({
  type: 'Point',
  coordinates: [lat, lon],
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
