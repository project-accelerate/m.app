const Postcodes = require('postcode')

export function isFullPostcode(postcode: string) {
  return new Postcodes(postcode).valid()
}

export function isOutcode(postcode: string) {
  return Postcodes.validOutcode(postcode)
}
