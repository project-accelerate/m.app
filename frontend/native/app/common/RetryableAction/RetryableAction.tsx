import React from 'react'
import { ApolloError } from 'apollo-client'
import { ErrorView } from '../ErrorView/ErrorView'
import { LoadingOverlay } from '../Widgets/Widgets'
import { NetInfo } from 'react-native'

interface RetryableActionProps<Params> {
  action: (params: Params) => Promise<any>
  params?: Params
  preserve?: boolean
  fullscreen?: boolean
  darkBg?: boolean
  onCompleted?: () => void
  children?: (props: { pending: boolean }) => React.ReactNode
}

interface RetryableActionState {
  pending: boolean
  errorState?: {
    retry: () => void
    error: Error | ApolloError
  }
}

export class RetryableAction<Params> extends React.Component<
  RetryableActionProps<Params>,
  RetryableActionState
> {
  state: RetryableActionState = {
    pending: false,
  }

  componentDidMount() {
    if (this.props.params) {
      this.trigger(this.props.params)
    }
  }

  trigger = async (params: Params) => {
    this.setState({
      pending: true,
    })

    try {
      await this.props.action(params)

      if (!this.props.preserve) {
        this.setState({
          pending: false,
          errorState: undefined,
        })
      }

      if (this.props.onCompleted) {
        this.props.onCompleted()
      }
    } catch (error) {
      this.setState({
        pending: false,
        errorState: {
          error,
          retry: () => this.trigger(params),
        },
      })
    }
  }

  render() {
    if (this.state.errorState) {
      return (
        <ErrorView
          error={this.state.errorState.error}
          darkBg={this.props.darkBg}
          isRetrying={this.state.pending}
          onRetry={this.state.errorState.retry}
        />
      )
    }

    if (this.state.pending && this.props.fullscreen) {
      return <LoadingOverlay darkBg={this.props.darkBg} />
    }

    if (this.props.children) {
      return this.props.children({
        pending: this.state.pending,
      })
    }

    return <LoadingOverlay />
  }
}
