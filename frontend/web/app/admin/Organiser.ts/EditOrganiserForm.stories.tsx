import React from 'react'
import { storiesOf } from '@storybook/react'
import { storyWrapper } from 'frontend.web/storybook/storyWrapper'
import { EditOrganiserForm } from './EditOrganiserForm'

storiesOf('EditOrganiserForm', module)
  .addDecorator(storyWrapper())
  .add('Initial', () => <EditOrganiserForm />)
