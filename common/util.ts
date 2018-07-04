export function never(x: never): never {
  throw Error(`Unexpected ${x}`)
}
