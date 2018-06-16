import * as React from 'react'
import { render } from 'react-dom'
import { Router, Switch, Link } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import { ApolloProvider } from 'react-apollo'
import { MuiThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';
import { IntlProvider } from 'react-intl';
import { AuthGuardProvider } from 'frontend.common/auth';

import theme from './theme';
import { AppWrapper } from './common/AppWrapper/AppWrapper';
import { graphQlClient } from './config/graphql';
import { tokenManager } from './config/auth';

const App = () => (  
  <AuthGuardProvider tokenManager={tokenManager}>
    <IntlProvider>
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
    </IntlProvider>
  </AuthGuardProvider>
)

if (typeof document !== 'undefined') {
  render(<App />, document.getElementById('root'))
}

export default hot(module)(App)
