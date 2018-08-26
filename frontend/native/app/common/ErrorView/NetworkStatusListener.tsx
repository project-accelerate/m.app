import React from 'react'
import { NetInfo } from 'react-native'

interface NetworkStatusListenerProps {
  onChange: (online: boolean) => void
}

export class NetworkStatusListener extends React.Component<
  NetworkStatusListenerProps
> {
  static currentStatus = true

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleNetworkStatusChange,
    )
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleNetworkStatusChange,
    )
  }

  handleNetworkStatusChange = (online: boolean) => {
    this.props.onChange(online)
  }

  render() {
    return null
  }
}

NetInfo.isConnected.fetch().then(online => {
  NetworkStatusListener.currentStatus = online
  NetInfo.isConnected.addEventListener(
    'connectionChange',
    online => (NetworkStatusListener.currentStatus = online),
  )
})
