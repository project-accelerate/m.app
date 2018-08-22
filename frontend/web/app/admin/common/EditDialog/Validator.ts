import { isFullPostcode } from 'common/domain/postcode'
import isUrl from 'is-url'

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

  export function optional<T>(
    validator: Validator<T>,
  ): Validator<T | undefined> {
    return value => {
      if (value) {
        return validator(value)
      }

      return true
    }
  }

  export function validUrl(message: string): Validator<string> {
    return value => {
      if (!isUrl(value)) {
        return message
      }

      return true
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
