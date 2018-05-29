import * as React from 'react'
import { Query } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { LoadingIndicator } from './LoadingIndicator';

interface LoadDataProps<T, Vars> {
  message?: React.ReactNode
  variables: Vars
  children: (props: LoadDataChildProps<T>) => React.ReactNode
}

interface LoadDataChildProps<T> {
  data: T
}

export function createDataLoader<T, Vars>(query: DocumentNode) {
  return function LoadData({ variables, message, children }: LoadDataProps<T, Vars>) {
    return (
      <Query query={query} variables={variables}>
      {
        ({ data, error, loading }) => {
          if (loading) {
            return <LoadingIndicator message={message} />
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
}
