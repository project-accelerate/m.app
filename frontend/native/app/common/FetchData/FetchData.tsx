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
  darkBg?: boolean
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
        <Query
          fetchPolicy="cache-and-network"
          key={this.state.retry}
          query={query}
          variables={variables}
        >
          {({ data, loading, client, error }) => {
            if (data && Object.keys(data).length > 0) {
              return children({ data, client })
            }

            if (error) {
              return (
                <ErrorView
                  error={error}
                  onRetry={this.handleRetry}
                  isRetrying={loading}
                />
              )
            }

            return <LoadingOverlay darkBg={this.props.darkBg} />
          }}
        </Query>
      )
    }
  }
}
