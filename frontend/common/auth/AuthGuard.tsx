import * as React from 'react'
import * as PropTypes from 'prop-types'
import { TokenManager } from './TokenManager';
import { TokenState } from './TokenState';

interface AuthGuardProps {
  /** The TokenManager instance for the application */
  tokenManager: TokenManager
}

interface AuthGuardState {
  token: TokenState
}

interface AuthGuardContext {
  /** The TokenManager instance for the application */
  manager: TokenManager

  /** The current application auth state */
  token: TokenState
}

interface AuthGuardReactContext {
  authGuardContext: AuthGuardContext
}

/** Provides auth details to React components */
export class AuthGuardProvider extends React.Component<AuthGuardProps, AuthGuardState> {
  manager = this.props.tokenManager

  static childContextTypes = {
    authGuardContext: PropTypes.any
  }

  state = {
    token: this.props.tokenManager.current
  }

  handleTokenChange = (token: TokenState) => {
    this.setState({ token })
  }

  componentDidMount() {
    this.props.tokenManager.on('change', this.handleTokenChange)
  }

  componentWillUnmount() {
    this.props.tokenManager.off('change', this.handleTokenChange)
  }

  getChildContext(): AuthGuardReactContext {
    return {
      authGuardContext: {
        manager: this.manager,
        token: this.state.token
      }
    }
  }

  render() {
    return this.props.children
  }
}

interface GuardProps {
  /** Rendered if the guard condition is met (eg the user authenticates) */
  render?: GuardRender

  /** Rendered if the guard condition is not met (eg the user does not authenticate */
  elseRender?: GuardRender

  /** Rendered if the guard condition is met. Alias for render prop */
  children?: GuardRender
}

type GuardRender
  = ((context: AuthGuardContext) => React.ReactNode)
  | React.ReactNode

interface GuardConfig {
  /** Function defining whether the current auth state is accepted */
  test: (state: TokenState) => boolean
}

/**
 * Create an AuthGuard component class for conditionally rendering based on
 * user credentials
 **/
export function createGuard({ test }: GuardConfig) {
  const Guard = function Guard(
    { render, elseRender, children }: GuardProps,
    { authGuardContext }: AuthGuardReactContext
  ): React.ReactNode {
    if (!authGuardContext) {
      throw Error([
        'Auth context is not set up.',
        'Did you forget to add <AuthGuardProvider /> to your app?'
      ].join(' '))
    }

    const applyRenderer = (renderer?: GuardRender) => {
      if (typeof renderer === 'function') {
        return renderer(authGuardContext) || null

      } else {
        return renderer || null
      }
    }

    if (test(authGuardContext.token)) {
      return applyRenderer(render || children)

    } else {
      return applyRenderer(elseRender)
    }
  } as React.ComponentType<GuardProps>

  Guard.contextTypes = AuthGuardProvider.childContextTypes
  return Guard
}

/** Conditionally render content if user is logged in */
export const LoggedInGuard = createGuard({
  test: token => typeof token.authProps !== 'undefined'
})

/** Create a custom guard for conditionally rendering based on user's roles */
export function createRoleAuthorizationGuard(roles: string[]) {
  return createGuard({
    test: token => roles.every(role => token.hasRole(role))
  })
}
