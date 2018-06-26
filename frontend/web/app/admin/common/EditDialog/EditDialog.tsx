import React from 'react'
import {
  WithStyles,
  withStyles,
  createStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core'
import { contentWidth } from 'frontend.web/app/common/Layouts'

const styles = () =>
  createStyles({
    content: {
      width: contentWidth,
    },
  })

interface EditDialogProps extends WithStyles<typeof styles> {
  title: string
  onSubmit: () => void
  onCancel: () => void
}

export const EditDialog = withStyles(styles)(
  class EditDialog extends React.Component<EditDialogProps> {
    render() {
      const { classes } = this.props

      return (
        <Dialog open onClose={this.props.onCancel} fullWidth>
          <DialogTitle>{this.props.title}</DialogTitle>

          <DialogContent>{this.props.children}</DialogContent>

          <DialogActions>
            <Button
              onClick={this.props.onCancel}
              variant="text"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.props.onSubmit}
              variant="raised"
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )
    }
  },
)
