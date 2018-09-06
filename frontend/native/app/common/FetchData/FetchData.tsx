import React from 'react'
import { DocumentNode } from 'graphql'
import { Query } from 'react-apollo'
import { LoadingOverlay } from '../Widgets/Widgets'
import { ApolloClient } from 'apollo-client'
import { ErrorView } from '../ErrorView/ErrorView'

interface FetchDataOpts {
  query: DocumentNode
}

interface FetchDataProps<Data, Params> {
  variables: Params
  children: (props: { data: Data; client: ApolloClient<{}> }) => React.ReactNode
}

interface FetchDataState {
  retry: number
}

export function createFetchData<Data, Params>({ query }: FetchDataOpts) {
  return class FetchData extends React.Component<
    FetchDataProps<Data, Params>,
    FetchDataState
  > {
    static required<T>(x: T | null): T {
      if (!x) {
        throw Error('Not found')
      }

      return x
    }

    state: FetchDataState = {
      retry: 0,
    }

    handleRetry = () => {
      this.setState({ retry: this.state.retry + 1 })
    }

    render() {
      const { variables, children } = this.props
      return (
        <Query key={this.state.retry} query={query} variables={variables}>
          {({ data, loading, client, error }) => {
            if (error) {
              return (
                <ErrorView
                  error={error}
                  onRetry={this.handleRetry}
                  isRetrying={loading}
                />
              )
            }
            if (!data || loading) {
              return <LoadingOverlay />
            }

            return children({ data, client })
          }}
        </Query>
      )
    }
  }
}
