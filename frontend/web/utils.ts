import { mapValues } from 'lodash'

export function toDataUri(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)

    reader.readAsDataURL(blob)
  })
}

/**
 * Replace nulls with undefined for each field
 */
export function normalizeFields<T>(obj: T): NormalizeFields<T> {
  return mapValues(obj, (x: any) => (x === null ? undefined : x)) as any
}

type NormalizeFields<T> = {
  [P in keyof T]: null extends T[P] ? undefined : T[P]
}
