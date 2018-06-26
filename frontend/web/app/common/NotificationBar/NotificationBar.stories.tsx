import React from 'react'
import { storiesOf } from '@storybook/react'
import { NotificationBar } from './NotificationBar'
import { Button } from '@material-ui/core'

storiesOf('NotificationBar', module).add('Default', () => {
  return (
    <NotificationBar>
      {({ showNotification }) => (
        <>
          <Button
            onClick={() =>
              showNotification({ type: 'success', content: 'Everything is ok' })
            }
          >
            Success
          </Button>
          <Button
            onClick={() =>
              showNotification({ type: 'error', content: 'That didnt work' })
            }
          >
            Error
          </Button>
        </>
      )}
    </NotificationBar>
  )
})
