import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { EditDialog } from './EditDialog'
import { lorem } from 'faker'

storiesOf('EditDialog', module).add('Default', () => (
  <EditDialog
    title="Title"
    onCancel={action('cancel')}
    onSubmit={action('submit')}
  >
    {lorem.paragraph(2)}
  </EditDialog>
))
