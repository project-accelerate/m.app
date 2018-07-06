import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'

import { BACKEND_URL } from './properties'
import { tokenManager } from './auth'

export const graphQlClient = new ApolloClient({
  link: createAuthLink().concat(
    createUploadLink({ uri: `${BACKEND_URL}/graphql` }),
  ),

  cache: new InMemoryCache(),
})

/** Connect GraphQL client to authentication state */
function createAuthLink() {
  return setContext((_, { headers }) => {
    const { authToken } = tokenManager.current

    return {
      headers: {
        ...headers,
        Authorization: authToken && `Bearer ${authToken}`,
      },
    }
  })
}
