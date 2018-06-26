import * as React from 'react'
import { sign } from 'jsonwebtoken'
import { StoryDecorator } from '@storybook/react'
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
} from '@material-ui/core'
import { action } from '@storybook/addon-actions'
import { MemoryRouter } from 'react-router'
import {
  AuthToken,
  AuthGuardProvider,
  TokenManager,
} from 'frontend.common/auth'
import { IntlProvider } from 'react-intl'
import theme from '../theme'

interface StoryWrapperConfig {
  user?: AuthToken
  width?: number
  height?: number
  bg?: string
}

export function storyWrapper(props?: StoryWrapperConfig): StoryDecorator
export function storyWrapper(
  props: StoryWrapperConfig,
  children: React.ReactNode,
): React.ReactElement<{}>
export function storyWrapper(
  props: StoryWrapperConfig = {},
  children?: React.ReactNode,
): React.ReactElement<{}> | StoryDecorator {
  const tokenManager = new TokenManager({
    getItem: () => (props.user ? sign(props.user, 'secret') : null),
    setItem: action(`set`),
    removeItem: action(`remove`),
  })

  const { width = '100vw', height = '100vh', bg: backgroundColor } = props

  const render = (children: () => React.ReactNode) => (
    <AuthGuardProvider tokenManager={tokenManager}>
      <IntlProvider>
        <MemoryRouter>
          <MuiThemeProvider
            theme={createMuiTheme(theme as any)}
            sheetsManager={new Map()}
          >
            <CssBaseline />
            <div
              style={{ position: 'relative', width, height, backgroundColor }}
            >
              {children()}
            </div>
          </MuiThemeProvider>
        </MemoryRouter>
      </IntlProvider>
    </AuthGuardProvider>
  )

  if (children) {
    return render(() => children)
  } else {
    return render
  }
}
