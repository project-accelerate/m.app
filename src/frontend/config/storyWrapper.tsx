import * as React from 'react'
import { MuiThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
import theme from '../theme'

export function storyWrapper() {
  return (children: any) => (
    <MuiThemeProvider theme={createMuiTheme(theme)} sheetsManager={new Map()}>
      <CssBaseline />
      <div style={{ width: '100vw', height: '100vh' }}>
        {children()}
      </div>
    </MuiThemeProvider>
  )
}
