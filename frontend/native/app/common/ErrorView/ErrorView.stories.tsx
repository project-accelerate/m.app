import React from 'react'
import { ErrorView } from './ErrorView'

const action = () => console.log('pressed')

export const stories = {
  Network: () => (
    <ErrorView
      error={{ networkError: Error() }}
      onRetry={action}
      isRetrying={false}
    />
  ),
  'Application Error': () => (
    <ErrorView error={Error()} onRetry={action} isRetrying={false} />
  ),
  'Server Error': () => (
    <ErrorView
      error={{ graphQLErrors: [Error()] }}
      onRetry={action}
      isRetrying={false}
    />
  ),
  Retrying: () => (
    <ErrorView error={Error('nah')} onRetry={action} isRetrying={true} />
  ),
}
