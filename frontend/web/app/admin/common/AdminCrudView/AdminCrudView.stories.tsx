import React from 'react'
import faker from 'faker'
import { storiesOf } from '@storybook/react'
import { action, decorateAction } from '@storybook/addon-actions'
import { AdminCrudView } from './AdminCrudView'
import { delay } from 'bluebird'
import { Button, Typography } from '@material-ui/core'
import { storyWrapper } from 'frontend.web/storybook/storyWrapper'
import { asyncAction } from 'frontend.web/storybook/actions'

storiesOf('AdminCrudView', module)
  .addDecorator(storyWrapper({ width: 320, height: 240, bg: 'steelgrey' }))
  .add('Default', () => (
    <AdminCrudView
      items={[item(), item(), item()]}
      onAddItem={asyncAction('add')}
      onEditItem={asyncAction('edit')}
      renderListItem={({ value, onEdit }) => (
        <>
          <Typography variant="title">{value.id}</Typography>
          <Button onClick={onEdit}>Edit</Button>
        </>
      )}
      renderAddItem={({ onCancel, onSave }) => (
        <>
          <Typography variant="title">New item</Typography>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={() => onSave({ id: 'new' })}>Save</Button>
        </>
      )}
      renderEditItem={({ value, onCancel, onSave }) => (
        <>
          <Typography variant="title">Editing {value.id}</Typography>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={() => onSave(value)}>Save</Button>
        </>
      )}
    />
  ))

const item = () => ({ id: faker.name.firstName() })
