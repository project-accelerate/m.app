import React from 'react'
import faker from 'faker'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { storyWrapper } from 'frontend.web/storybook/storyWrapper'
import { asyncAction } from 'frontend.web/storybook/actions'
import { OrganiserAdminCard } from 'frontend.web/app/admin/Organiser/OrganiserAdminCard'
import { EditOrganiserForm } from './EditOrganiserForm'

import somePhoto from 'common/test/somePhoto.jpg'

storiesOf('Organiser Admin', module)
  .addDecorator(storyWrapper())
  .add('Edit Form', () => (
    <EditOrganiserForm
      title="Do Something"
      onSave={asyncAction('save')}
      onCancel={action('cancel')}
    />
  ))
  .add('Card (No Image)', () => (
    <OrganiserAdminCard
      organiser={{
        id: faker.random.uuid(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        bio: faker.lorem.paragraphs(4),
        photo: null,
      }}
      onEdit={action('edit')}
    />
  ))
  .add('Card (Image)', () => (
    <OrganiserAdminCard
      organiser={{
        id: faker.random.uuid(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        bio: faker.lorem.paragraphs(4),
        photo: {
          sourceUrl: somePhoto,
        },
      }}
      onEdit={action('edit')}
    />
  ))
