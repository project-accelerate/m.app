import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { backendUrl } from './properties';

export const graphQlClient = new ApolloClient({
  link: new HttpLink({ uri: backendUrl }),
  cache: new InMemoryCache(),
});
