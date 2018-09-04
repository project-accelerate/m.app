import React from 'react'
import faker from 'faker'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { storyWrapper } from 'frontend.web/storybook/storyWrapper'
import { asyncAction } from 'frontend.web/storybook/actions'
import { PersonAdminCard } from 'frontend.web/app/admin/Person/PersonAdminCard'
import { EditPersonForm } from './EditPersonForm'

import somePhoto from 'common/test/somePhoto.jpg'

storiesOf('Person Admin', module)
  .addDecorator(storyWrapper())
  .add('Edit Form', () => (
    <EditPersonForm
      title="Do Something"
      onSave={asyncAction('save')}
      onCancel={action('cancel')}
    />
  ))
  .add('Card (No Image)', () => (
    <PersonAdminCard
      person={{
        id: faker.random.uuid(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        bio: faker.lorem.paragraphs(4),
        photo: null,
        twitterHandle: "@mrtestguy"
      }}
      onEdit={action('edit')}
    />
  ))
  .add('Card (Image)', () => (
    <PersonAdminCard
      person={{
        id: faker.random.uuid(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        bio: faker.lorem.paragraphs(4),
        photo: {
          sourceUrl: somePhoto,
        },
        twitterHandle: "@mrtestguy"
      }}
      onEdit={action('edit')}
    />
  ))
