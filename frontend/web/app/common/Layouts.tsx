import * as React from 'react'
import { withStyles, Grid, Typography, createStyles } from '@material-ui/core'
import { Theme } from '@material-ui/core'

const styles = withStyles(({ spacing }) =>
  createStyles({
    mainWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      minHeight: '100%',
      marginTop: spacing.unit * 2,
      '& > *': {
        maxWidth: contentWidth,
      },
    },
  }),
)

export const Main = styles(function Main({ children, classes }) {
  return <main className={classes.mainWrapper}>{children}</main>
})

export const contentWidth = '50em'
