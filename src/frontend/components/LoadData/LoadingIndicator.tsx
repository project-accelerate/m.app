import * as React from 'react'
import { FontWeightProperty } from 'csstype';
import { CircularProgress, withStyles, Grid, Typography } from '@material-ui/core';

interface LoadingIndicatorProps {
  message?: React.ReactNode
}

const styles = withStyles(({ spacing, palette }) => ({
  loadIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: palette.common.white,
    fontWeight: 'bolder' as FontWeightProperty,
    marginTop: spacing.unit
  }
}))

export const LoadingIndicator = styles<LoadingIndicatorProps>(
  function LoadingIndicator({ classes, message = "Loading…" }) {
    return (
      <Grid container direction="column" className={classes.loadIndicator}>
        <CircularProgress />
        <Typography className={classes.message}>{message}</Typography>
      </Grid>
    )
  }
)
