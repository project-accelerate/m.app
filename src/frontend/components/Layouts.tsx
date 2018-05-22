import * as React from 'react'
import { withStyles, Grid, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core';

const pageHeadingStyles = (theme: Theme) => ({
  pageHeading: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing.unit
  }
})

export const PageHeading = withStyles(pageHeadingStyles)(({ children, classes }) => (
  <Grid className={classes.pageHeading} xs={12} justify="center">
    <Typography variant="title">
      {children}
    </Typography>
  </Grid>
))
