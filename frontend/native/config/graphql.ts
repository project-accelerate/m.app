import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BACKEND_URL } from './properties'

export const graphQlClient = new ApolloClient({
  link: new HttpLink({ uri: `${BACKEND_URL}/graphql` }),
  cache: new InMemoryCache(),
})
