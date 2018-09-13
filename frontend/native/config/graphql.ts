import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { RetryLink } from 'apollo-link-retry'
import { BACKEND_URL } from './properties'
import { AsyncStorage } from 'react-native'
import { ApolloLink } from 'apollo-link'

const SCHEMA_VERSION = 1

const cache = new InMemoryCache()
persistCache({
  cache,
  storage: AsyncStorage as any,
  key: `graphql-data-v${SCHEMA_VERSION}`,
})

export const graphQlClient = new ApolloClient({
  link: ApolloLink.from([
    new RetryLink(),
    new HttpLink({ uri: `${BACKEND_URL}/graphql` }),
  ]),
  cache,
})
