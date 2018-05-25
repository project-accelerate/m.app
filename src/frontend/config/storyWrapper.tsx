import * as React from 'react'
import { MuiThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
import { MemoryRouter } from 'react-router';
import theme from '../theme'
import { IntlProvider } from 'react-intl';

export function storyWrapper() {
  return (children: any) => (
    <IntlProvider>
      <MemoryRouter>
        <MuiThemeProvider theme={createMuiTheme(theme)} sheetsManager={new Map()}>
          <CssBaseline />
          <div style={{ width: '100vw', height: '100vh' }}>
            {children()}
          </div>
        </MuiThemeProvider>
      </MemoryRouter>
    </IntlProvider>
  )
}
