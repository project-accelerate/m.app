import React from 'react'
import faker from 'faker'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { storyWrapper } from 'frontend.web/storybook/storyWrapper'
import { asyncAction } from 'frontend.web/storybook/actions'
import { EditNotificationForm } from 'frontend.web/app/admin/Notification/EditNotificationForm'

import somePhoto from 'common/test/somePhoto.jpg'

storiesOf('Notification Admin', module)
  .addDecorator(storyWrapper())
  .add('Edit Form', () => (
    <EditNotificationForm
      onSave={asyncAction('save')}
      onCancel={action('cancel')}
      events={[
        { id: 'Utopia Now!', name: 'Utopia Now!' },
        { id: 'Eat The Rich', name: 'Eat the Rich' },
      ]}
    />
  ))
