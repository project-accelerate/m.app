import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { backendUrl } from './properties';
import { tokenManager } from './auth';

const authLink = setContext((_, { headers }) => {
  const { authToken } = tokenManager.current

  return {
    headers: {
      ...headers,
      Authorization: authToken && `Bearer ${authToken}`
    }
  }
})

export const graphQlClient = new ApolloClient({
  link: new HttpLink({ uri: backendUrl }).concat(authLink),
  cache: new InMemoryCache(),
});
