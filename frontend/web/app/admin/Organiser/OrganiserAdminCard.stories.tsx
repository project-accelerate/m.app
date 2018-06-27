import React from 'react'
import faker from 'faker'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import somePhoto from 'common/test/somePhoto.jpg'
import { storyWrapper } from 'frontend.web/storybook/storyWrapper'
import { OrganiserAdminCard } from './OrganiserAdminCard'

storiesOf('OrganiserAdminCard', module)
  .addDecorator(storyWrapper())
  .add('No Image', () => (
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
  .add('With Image', () => (
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
