import * as React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import { ApolloProvider } from 'react-apollo'
import CssBaseline from '@material-ui/core/CssBaseline'

import { graphQlClient } from './config/graphql';

const App = () => (
  <ApolloProvider client={graphQlClient}>
    <CssBaseline />
    <Router>
      <Routes />
    </Router>
  </ApolloProvider>
)

export default hot(module)(App)
