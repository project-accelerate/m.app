import { postcodesUrl } from '../../../config/properties'

/** Return the user's current geolocation */
export function getUserPosition() {
  return new Promise<Position>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export interface PositionInfo {
  /** Nearest postcode */
  postcode: string

  /** Outcode (first portion) of nerest postcode */
  outcode: string
}

/** Lookup information about a geolocated position */
export function getPositionInfo({
  coords: { latitude, longitude },
}: Position): Promise<PositionInfo | undefined> {
  const url = `${postcodesUrl}/postcodes?lon=${longitude}&lat=${latitude}`

  return fetch(url)
    .then(response => response.json())
    .then(({ result }) => result)
}
