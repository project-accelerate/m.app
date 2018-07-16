import { Arg } from 'type-graphql'

/** Sugar for the request param to a mutation */
export const MutationRequest = (type: () => new () => any) =>
  Arg('request', type)
