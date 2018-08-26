import React from 'react'
import { View } from 'react-native'
import { LoadingOverlay } from '../Widgets/Widgets'
import { NetworkStatusListener } from './NetworkStatusListener'
import { RetryErrorEvent } from './ErrorView'

interface OfflineErrorViewProps {
  isRetrying: boolean
  onRetry: (event: RetryErrorEvent) => void
}

export class OfflineErrorView extends React.Component<OfflineErrorViewProps> {
  handleNetworkStatusChange = (online: boolean) => {
    setTimeout(() => {
      if (online && !this.props.isRetrying) {
        this.props.onRetry({
          attempt: 0,
          networkError: true,
        })
      }
    }, 2000)
  }

  render() {
    return (
      <LoadingOverlay>
        <NetworkStatusListener onChange={this.handleNetworkStatusChange} />
      </LoadingOverlay>
    )
  }
}
