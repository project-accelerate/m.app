import * as uuid from 'uuid'
import { Point } from 'geojson';

export const someString = () => "Foo"
export const someUuid = uuid
export const someDate = () => new Date('2010-01-01')
export const somePostcode = () => 'OX49 5NU'
export const someInt = () => 1
export const someGeoPoint = (lat = someInt(), long = someInt()): Point => ({
  type: 'Point',
  coordinates: [lat, long]
})

export const someEvent = (props: any = {}) => ({
  ...props,
  preventDefault: jest.fn(),
  stopPropagation: jest.fn()
})

export const someEventWithValue = (value: any) => someEvent({
  currentTarget: { value }
})
