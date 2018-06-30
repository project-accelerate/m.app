import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { lorem } from 'faker'
import { EditDialog } from './EditDialog'
import { asyncAction } from 'frontend.web/storybook/actions'

storiesOf('EditDialog', module).add('Default', () => (
  <EditDialog
    initial={{}}
    title="Title"
    onCancel={action('cancel')}
    onSubmit={asyncAction('submit')}
  >
    {lorem.paragraph(2)}
  </EditDialog>
))
