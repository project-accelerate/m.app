import React from 'react'
import { observable, computed, toJS, observe } from 'mobx'
import { observer } from 'mobx-react'
import { delay } from 'bluebird'
import {
  Snackbar,
  WithStyles,
  Theme,
  createStyles,
  SnackbarContent,
  IconButton,
  withStyles,
} from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { Close, CheckCircle, Warning } from '@material-ui/icons'

interface NotificationBarProps extends WithStyles<typeof styles> {
  children?: (props: NotificationRenderProps) => React.ReactNode
}

interface NotificationRenderProps {
  showNotification: (notification: Notification) => void
}

export type Notification = {
  type: 'success' | 'error'
  content: React.ReactNode
}

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    close: {
      width: spacing.unit * 4,
      height: spacing.unit * 4,
    },
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: palette.error.dark,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      fontSize: 20,
      opacity: 0.9,
      marginRight: spacing.unit,
    },
  })

interface NotificationBarState {
  current?: NotificationData
  open: boolean
}

interface NotificationData {
  key: number
  notification: Notification
}

@observer
class _NotificationBar extends React.Component<
  NotificationBarProps,
  NotificationBarState
> {
  static displayName = 'NotificationBar'

  icons = {
    error: Warning,
    success: CheckCircle,
  }

  state: NotificationBarState = {
    open: false,
  }

  queue: NotificationData[] = []

  showNotification = (notification: Notification) => {
    this.queue.push({
      notification,
      key: Date.now(),
    })

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false })
    } else {
      this.processQueue()
    }
  }

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        current: this.queue.shift(),
        open: true,
      })
    }
  }

  handleClose = (event: {}) => {
    this.setState({ open: false })
  }

  handleExited = () => {
    this.processQueue()
  }

  renderContent() {
    const { classes } = this.props
    const { current } = this.state

    if (!current) {
      return null
    }

    const { notification } = current
    const Icon = this.icons[notification.type]

    return (
      <SnackbarContent
        className={classes[notification.type]}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classes.icon} />
            {notification.content}
          </span>
        }
        action={
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleClose}
          >
            <Close className={classes.icon} />
          </IconButton>
        }
      />
    )
  }

  render() {
    return (
      <>
        {this.props.children && this.props.children(this)}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          key={this.state.current && this.state.current.key}
          open={this.state.open}
          autoHideDuration={3_000}
          onClose={this.handleClose}
        >
          {this.renderContent()}
        </Snackbar>
      </>
    )
  }
}

export const NotificationBar = withStyles(styles)(_NotificationBar)
