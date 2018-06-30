interface Connection<T> {
  edges: Array<{
    node: T
  }>
}

export function unwrapConnection<T>(connection: Connection<T>): T[]
export function unwrapConnection<T, Key extends keyof T>(
  connection: Connection<T>,
  key: Key,
): T[Key][]
export function unwrapConnection(
  connection: Connection<any>,
  key?: string,
): any[] {
  return connection.edges.map(edge => (key ? edge.node[key] : edge.node))
}
