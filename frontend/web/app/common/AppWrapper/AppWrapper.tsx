import * as React from 'react'
import { PageTabs, PageTab } from './PageTabs'
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core'
import { StyleRules } from '@material-ui/core/styles'
import { AccountCircle } from '@material-ui/icons'
import { LoggedInGuard } from 'frontend.common/auth'
import { contentWidth } from '../Layouts'
import { DynamicContent } from '../DynamicContent/DynamicContent'

const styles: StyleRules = {
  logo: {
    display: 'inline-block',
    background: `url("${require('./momentum.png')}")`,
    width: 48,
    height: 48,
    mixBlendMode: 'darken',
    backgroundSize: 'cover',
  },
  flex: {
    flex: 1,
  },
  toolbar: {
    minHeight: 0,
    maxWidth: contentWidth,
    flex: 1,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
}

/** View enclosing the app with toolbar, etc */
export const AppWrapper = withStyles(styles)(({ children, classes }) => (
  <>
    <AppBar className={classes.appBar} position="sticky" color="default">
      <Toolbar className={classes.toolbar}>
        <i className={classes.logo} />

        <PageTabs scrollable className={classes.flex} value={0}>
          <PageTab path="/events" label="Explore" />
          <PageTab path="/events/calendar" label="Calendar" />
          <PageTab path="/events/organise" label="Organise" />
        </PageTabs>

        <DynamicContent>
          <LoggedInGuard
            render={
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <AccountCircle />
              </IconButton>
            }
            elseRender={<Button>Login</Button>}
          />
        </DynamicContent>
      </Toolbar>
    </AppBar>
    {children}
  </>
))
