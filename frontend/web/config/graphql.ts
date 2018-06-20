import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { backendUrl } from './properties'
import { tokenManager } from './auth'
import { ApolloLink } from 'apollo-link'

const authLink = setContext((_, { headers }) => {
  const { authToken } = tokenManager.current

  return {
    headers: {
      ...headers,
      Authorization: authToken && `Bearer ${authToken}`,
    },
  }
})

class ErrorLink extends ApolloLink {
  request(): never {
    throw new Error('Cannot fetch data at build time!')
  }
}

export const graphQlClient = new ApolloClient({
  link:
    typeof window === 'undefined'
      ? new ErrorLink()
      : authLink.concat(new HttpLink({ uri: backendUrl })),
  cache: new InMemoryCache(),
})
