import React from 'react'
import { ErrorView, RetryErrorEvent } from './ErrorView'
import { Updates } from 'expo'
import Sentry from 'sentry-expo'

interface ErrorGuardProps {}

interface ErrorGuardState {
  error?: Error
  attempt: number
}

export class ErrorGuard extends React.Component<
  ErrorGuardProps,
  ErrorGuardState
> {
  state: ErrorGuardState = {
    attempt: 0,
  }

  componentDidMount() {
    this.componentDidCatch(new Error('error'))
  }

  componentDidCatch(error: Error) {
    Sentry.captureException(error)
    this.setState({ error })
  }

  handleRetry = async (retry: RetryErrorEvent) => {
    if (retry.attempt > 2) {
      this.reloadApp()
    } else {
      this.setState({ attempt: retry.attempt })
    }
  }

  async reloadApp() {
    try {
      const check = await Updates.checkForUpdateAsync()
      if (check.isAvailable) {
        await Updates.fetchUpdateAsync()
      }
    } finally {
      Updates.reloadFromCache()
    }
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorView
          onRetry={this.handleRetry}
          isRetrying={false}
          error={this.state.error}
        />
      )
    }

    return React.cloneElement(React.Children.only(this.props.children), {
      key: this.state.attempt,
    })
  }
}
