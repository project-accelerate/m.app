import { ObjectType, Field } from 'type-graphql'
import { GraphQLInt } from 'graphql'

/**
 * Interface for a connection type. Supports cursor-based pagination.
 * See: https://dev-blog.apollodata.com/explaining-graphql-connections-c48b7c3d6976
 */
interface Connection<T> {
  total?: number
  edges: Edge<T>[]
}

interface Edge<T> {
  node: T
}

interface ConnectionOptions<T> {
  type: new () => T
  name?: string
}

type SimpleConnectionType<T> = new (items?: T[]) => Connection<T>

/**
 * Simplest implementation of a connectionn type.
 *
 * Wraps an array of objects in the connection types, without paging
 * fetches from the database. Allows the implementation to be swapped for
 * one with pagination later without breaking the API.
 */
export function createSimpleConnection<T>(
  opts: ConnectionOptions<T>,
): SimpleConnectionType<T> {
  const basename = opts.name || opts.type.name
  const connectionName = `${basename}Connection`
  const edgeName = `${basename}Edge`

  @ObjectType(edgeName)
  class EdgeImpl implements Edge<T> {
    static wrapNode(node: T) {
      const edge = new EdgeImpl()
      edge.node = node
      return edge
    }

    @Field(() => opts.type)
    node!: T
  }

  @ObjectType(connectionName)
  class ConnectionImpl implements Connection<T> {
    constructor(private nodes: T[] = []) {}

    @Field(() => GraphQLInt)
    get total() {
      return this.nodes.length
    }

    @Field(() => [EdgeImpl])
    get edges() {
      return this.nodes.map(EdgeImpl.wrapNode)
    }
  }

  return ConnectionImpl
}
