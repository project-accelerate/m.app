import * as React from 'react'
import { sign } from 'jsonwebtoken'
import { StoryDecorator } from '@storybook/react';
import { MuiThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router';
import { AuthToken } from '../../common/AuthToken';
import theme from '../theme'
import { IntlProvider } from 'react-intl';
import { AuthGuardProvider } from '../services/Auth/AuthGuard';
import { TokenManager } from '../services/Auth/TokenManager';

interface StoryWrapperConfig {
  user?: AuthToken
}

export function storyWrapper(props?: StoryWrapperConfig): StoryDecorator
export function storyWrapper(props: StoryWrapperConfig, children: React.ReactNode): React.ReactElement<{}>
export function storyWrapper(props: StoryWrapperConfig = {}, children?: React.ReactNode): React.ReactElement<{}> | StoryDecorator {
  const tokenManager = new TokenManager({
    getItem: () => props.user ? sign(props.user, 'secret') : null,
    setItem: action(`set`),
    removeItem: action(`remove`),
  })

  const render = (children: () => React.ReactNode) => (
    <AuthGuardProvider tokenManager={tokenManager}>
      <IntlProvider>
        <MemoryRouter>
          <MuiThemeProvider theme={createMuiTheme(theme as any)} sheetsManager={new Map()}>
            <CssBaseline />
            <div style={{ width: '100vw', height: '100vh' }}>
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
