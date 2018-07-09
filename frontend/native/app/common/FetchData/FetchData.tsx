import React from 'react'
import { DocumentNode } from 'graphql'
import { Query } from 'react-apollo'
import { LoadingOverlay } from '../Widgets/Widgets'

interface FetchDataOpts {
  query: DocumentNode
}

interface FetchDataProps<Data, Params> {
  variables: Params
  children: (props: { data: Data }) => React.ReactNode
}

export function createFetchData<Data, Params>({ query }: FetchDataOpts) {
  return class FetchData extends React.Component<FetchDataProps<Data, Params>> {
    static required<T>(x: T | null): T {
      if (!x) {
        throw Error('Not found')
      }

      return x
    }

    render() {
      const { variables, children } = this.props

      return (
        <Query query={query} variables={variables}>
          {({ data, loading }) => {
            if (!data || loading) {
              return <LoadingOverlay />
            }

            return children({ data })
          }}
        </Query>
      )
    }
  }
}
