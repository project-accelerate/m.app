import * as React from 'react'
import { Query } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { LoadingIndicator } from './LoadingIndicator';

interface LoadDataProps<T, Vars> {
  query: DocumentNode
  variables: Vars
  children: (props: LoadDataChildProps<T>) => React.ReactNode
}

interface LoadDataChildProps<T> {
  data: T
}

export function LoadData<T, Vars>({ query, variables, children }: LoadDataProps<T, Vars>) {
  return (
    <Query<T> query={query} variables={variables}>
    {
      ({ data, error, loading }) => {
        if (loading) {
          return <LoadingIndicator />
        }

        if (data) {
          return children({ data })
        }

        if (error) {
          throw error
        }

        throw Error(`Query returned empty response`)
      }
    }
    </Query>
  )
}
