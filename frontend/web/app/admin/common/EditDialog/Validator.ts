import { isFullPostcode } from 'common/domain/postcode'

export type Validator<T> = (value: T) => true | string

export namespace Validator {
  export function anything(): Validator<any> {
    return () => true
  }

  export function notEmpty(message: string): Validator<string> {
    return value => {
      if (value) {
        return true
      }

      return message
    }
  }

  export function isValidPostcode(message: string): Validator<string> {
    return value => {
      if (isFullPostcode(value)) {
        return true
      }

      return message
    }
  }

  export function atLeastOne(message: string): Validator<any[]> {
    return value => {
      if (value.length >= 1) {
        return true
      }

      return message
    }
  }
}
