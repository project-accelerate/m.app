import 'core-js'
import * as React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Switch, Route, Redirect } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import {
  MuiThemeProvider,
  CssBaseline,
  createMuiTheme,
} from '@material-ui/core'
import { IntlProvider } from 'react-intl'
import { AuthGuardProvider, LoggedInGuard } from 'frontend.common/auth'

import theme from './theme'
import { graphQlClient } from './config/graphql'
import { tokenManager } from './config/auth'
import { createBrowserHistory } from 'history'
import { AppWrapper } from './app/common/AppWrapper/AppWrapper'
import EventFeedPage from './app/events/EventFeedPage'
import { configureServiceWorker } from './config/serviceWorker'
import { AuthCallback } from 'app/common/authentication/AuthCallback'
import { OrganiserAdminPage } from 'frontend.web/app/admin/Organiser/OrganiserAdminPage'

const App = () => (
  <AuthGuardProvider tokenManager={tokenManager}>
    <IntlProvider locale="en">
      <MuiThemeProvider theme={createMuiTheme(theme as any)}>
        <ApolloProvider client={graphQlClient}>
          <BrowserRouter>
            <LoggedInGuard
              render={
                <AppWrapper>
                  <Redirect exact from="/" to="/admin/speakers" />
                  <CssBaseline />
                  <Switch>
                    <Route
                      path="/admin/speakers"
                      component={OrganiserAdminPage}
                    />
                  </Switch>
                </AppWrapper>
              }
              elseRender={<AuthCallback />}
            />
          </BrowserRouter>
        </ApolloProvider>
      </MuiThemeProvider>
    </IntlProvider>
  </AuthGuardProvider>
)

render(<App />, document.getElementById('root'))
configureServiceWorker()

export default App
