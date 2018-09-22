import React from 'react'
import { ErrorView } from './ErrorView'
import { OfflineErrorView } from './OfflineErrorView'
import { ErrorGuard } from './ErrorGuard'

const action = () => console.log('pressed')

export const stories = {
  Network: () => <OfflineErrorView onRetry={action} isRetrying={false} />,
  'Application Error': () => (
    <ErrorGuard>
      <Throw />
    </ErrorGuard>
  ),
  'Server Error': () => (
    <ErrorView
      error={{ graphQLErrors: [Error() as any] }}
      onRetry={action}
      isRetrying={false}
    />
  ),
  Retrying: () => (
    <ErrorView error={Error('nah')} onRetry={action} isRetrying={true} />
  ),
}

function Throw(props: {}) {
  throw Error()
  return null
}
