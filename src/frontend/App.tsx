import * as React from 'react'
import { Router, Switch, Link } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import { ApolloProvider } from 'react-apollo'
import { MuiThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';

import { graphQlClient } from './config/graphql';
import theme from './theme';
import { AppWrapper } from './components/AppWrapper/AppWrapper';

const App = () => (
  <MuiThemeProvider theme={createMuiTheme(theme as any)}>
    <ApolloProvider client={graphQlClient}>
      <CssBaseline />
      <Router>
        <AppWrapper>
          <Switch>
            <Routes />
          </Switch>
        </AppWrapper>
      </Router>
    </ApolloProvider>
  </MuiThemeProvider>
)

export default hot(module)(App)
