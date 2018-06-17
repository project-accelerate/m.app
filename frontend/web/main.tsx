import 'core-js'
import * as React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import {
  MuiThemeProvider,
  CssBaseline,
  createMuiTheme,
} from '@material-ui/core'
import { IntlProvider } from 'react-intl'
import { AuthGuardProvider } from 'frontend.common/auth'

import theme from './theme'
import { graphQlClient } from './config/graphql'
import { tokenManager } from './config/auth'
import { Router, Switch, Route } from 'react-router'
import { createBrowserHistory } from 'history'
import { AppWrapper } from './app/common/AppWrapper/AppWrapper'
import EventFeedPage from './app/events/EventFeedPage'
import { configureServiceWorker } from './config/serviceWorker'

const App = () => (
  <AuthGuardProvider tokenManager={tokenManager}>
    <IntlProvider>
      <MuiThemeProvider theme={createMuiTheme(theme as any)}>
        <ApolloProvider client={graphQlClient}>
          <CssBaseline />
          <Router history={createBrowserHistory()}>
            <AppWrapper>
              <Switch>
                <Route path="/events" component={EventFeedPage} />
              </Switch>
            </AppWrapper>
          </Router>
        </ApolloProvider>
      </MuiThemeProvider>
    </IntlProvider>
  </AuthGuardProvider>
)

render(<App />, document.getElementById('root'))
configureServiceWorker()

export default App
