import React from 'react'
import { TokenManager, WithAuth } from 'frontend.common/auth'
import { Route, Redirect } from 'react-router'
import { Location, History } from 'history'
import { handleAuthentication } from './authorize'
import { auth0 } from './auth0'

export function AuthCallback() {
  return (
    <Route>
      {({ history }) => (
        <WithAuth>
          {({ manager }) => (
            <AuthCallbackHandler tokenManager={manager} history={history} />
          )}
        </WithAuth>
      )}
    </Route>
  )
}

interface AuthCallbackHandlerProps {
  tokenManager: TokenManager
  history: History
}

class AuthCallbackHandler extends React.Component<
  AuthCallbackHandlerProps,
  { redirect?: string }
> {
  state = { redirect: undefined }

  componentDidMount() {
    const { pathname, hash } = this.props.history.location

    if (/id_token|error/.test(hash)) {
      auth0.parseHash((err, authResult) => {
        if (authResult && authResult.idToken) {
          this.props.history.replace(authResult.state || pathname)
          this.props.tokenManager.setToken(authResult.idToken)
        }
      })
    } else {
      const { protocol, host, pathname } = window.location

      auth0.authorize({
        redirectUri: `${protocol}//${host}`,
        state: pathname,
      })
    }
  }

  render() {
    return null
  }
}
