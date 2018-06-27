import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { storyWrapper } from 'frontend.web/storybook/storyWrapper'
import { EditOrganiserForm } from './EditOrganiserForm'
import { asyncAction } from 'frontend.web/storybook/actions'

storiesOf('EditOrganiserForm', module)
  .addDecorator(storyWrapper())
  .add('Initial', () => (
    <EditOrganiserForm
      title="Do Something"
      onSave={asyncAction('save')}
      onCancel={action('cancel')}
    />
  ))
