import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { storyWrapper } from 'frontend.web/storybook/storyWrapper'
import { EditOrganiserForm } from './EditOrganiserForm'

storiesOf('EditOrganiserForm', module)
  .addDecorator(storyWrapper())
  .add('Initial', () => (
    <EditOrganiserForm
      title="Do Something"
      onSave={action('save')}
      onCancel={action('cancel')}
    />
  ))
