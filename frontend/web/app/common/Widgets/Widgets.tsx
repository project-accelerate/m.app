import React from 'react'
import { withStyles, Theme, createStyles } from '@material-ui/core'
import Button, { ButtonProps } from '@material-ui/core/Button'

const styles = withStyles(({ spacing }) =>
  createStyles({
    fab: {
      position: 'fixed',
      padding: spacing.unit,
      right: 0,
      bottom: 0,
    },
  }),
)

export const FloatingActionButton = styles<ButtonProps>(
  function FloatingActionButton({ className, classes, ...props }) {
    return (
      <div className={classes.fab}>
        <Button {...props} variant="fab" className={className} />
      </div>
    )
  },
)
