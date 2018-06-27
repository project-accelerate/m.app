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
import { LoadingIndicator } from 'frontend.web/app/common/LoadData/LoadingIndicator'

const styles = () =>
  createStyles({
    content: {
      width: contentWidth,
    },
    loadingOverlay: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
  })

interface EditDialogProps extends WithStyles<typeof styles> {
  title: string
  onSubmit: () => Promise<void>
  onCancel: () => void
}

export const EditDialog = withStyles(styles)(
  class EditDialog extends React.Component<EditDialogProps> {
    state = { busy: false }

    handleSubmit = async () => {
      try {
        this.setState({ busy: true })
        await this.props.onSubmit()
      } finally {
        this.setState({ busy: false })
      }
    }

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
              onClick={this.handleSubmit}
              variant="raised"
              color="primary"
            >
              Save
            </Button>
          </DialogActions>

          {this.state.busy && (
            <div className={classes.loadingOverlay}>
              <LoadingIndicator message="Saving..." />
            </div>
          )}
        </Dialog>
      )
    }
  },
)
