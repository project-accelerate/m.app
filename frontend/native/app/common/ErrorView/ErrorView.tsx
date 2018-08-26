import React from 'react'
import { View, StyleSheet, NetInfo } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { ApolloError } from 'apollo-client'
import { Typography } from '../Typography/Typography'
import { Button } from '../Butttons/Buttons'
import { theme } from '../../../theme'
import { LoadingOverlay } from '../Widgets/Widgets'

interface ErrorViewProps {
  isRetrying: boolean
  onRetry: () => void
  error: Partial<ApolloError>
}

interface ErrorViewState {
  online?: boolean
}

const style = StyleSheet.create({
  root: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    paddingBottom: theme.spacing.level(4),
  },
  item: {
    textAlign: 'center',
    margin: theme.spacing.level(1),
    marginHorizontal: theme.spacing.level(3),
  },
})

export class ErrorView extends React.Component<ErrorViewProps> {
  static assumeOnline?: boolean

  static initialStateSubscriber(online: boolean) {
    ErrorView.assumeOnline = online
  }

  state: ErrorViewState = {
    online: ErrorView.assumeOnline,
  }

  componentDidMount() {
    console.log(this.props.error.message)

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
    if (!this.state.online && online && !this.props.isRetrying) {
      this.props.onRetry()
    }

    this.setState({ online })
  }

  get explanation() {
    return 'Please try again'
  }

  get errorType() {
    if (this.props.error.networkError) {
      return 'network'
    }

    if (this.props.error.graphQLErrors) {
      return 'remote'
    }

    return 'application'
  }

  render() {
    if (this.props.isRetrying) {
      return <LoadingOverlay />
    }

    return (
      <View style={style.root}>
        <View style={style.wrapper}>
          <Typography style={style.item} variant="cardTitle">
            Sorry, something went wrong
          </Typography>

          <Typography style={style.item} variant="body">
            {this.explanation}
            {!this.state.online && '\nYour phone seems to be offline'}
          </Typography>

          <Button variant="inline" onPress={this.props.onRetry}>
            Retry
          </Button>
        </View>
      </View>
    )
  }
}

NetInfo.isConnected.fetch().then(online => {
  ErrorView.assumeOnline = online
  NetInfo.isConnected.addEventListener(
    'connectionChange',
    ErrorView.initialStateSubscriber,
  )
})
