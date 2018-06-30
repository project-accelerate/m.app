import React from 'react'
import faker from 'faker'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { storyWrapper } from 'frontend.web/storybook/storyWrapper'
import { VenueAdminCard } from 'frontend.web/app/admin/Venue/VenueAdminCard'

import somePhoto from 'common/test/somePhoto.jpg'
import { somePostcode } from 'common/test/testUtils'
import { EditVenueForm } from 'frontend.web/app/admin/Venue/EditVenueForm'
import { asyncAction } from 'frontend.web/storybook/actions'

storiesOf('Venue Admin', module)
  .addDecorator(storyWrapper())
  .add('Card (No Image)', () => (
    <VenueAdminCard
      venue={{
        id: faker.random.uuid(),
        name: `${faker.commerce.productName()}`,
        description: faker.lorem.paragraphs(4),
        address: {
          streetAddress: faker.address.streetAddress(),
          city: faker.address.city(),
          postcode: somePostcode(),
        },
        photo: null,
      }}
      onEdit={action('edit')}
    />
  ))
  .add('Card (Image)', () => (
    <VenueAdminCard
      venue={{
        id: faker.random.uuid(),
        name: `${faker.commerce.productName()}`,
        description: faker.lorem.paragraphs(4),
        address: {
          streetAddress: faker.address.streetAddress(),
          city: faker.address.city(),
          postcode: somePostcode(),
        },
        photo: { sourceUrl: somePhoto },
      }}
      onEdit={action('edit')}
    />
  ))
  .add('Edit Form', () => (
    <EditVenueForm
      title="Edit Venue"
      initial={{
        name: `${faker.commerce.productName()}`,
        description: faker.lorem.paragraphs(4),
        streetAddress: faker.address.streetAddress(),
        city: faker.address.city(),
        postcode: somePostcode(),
        photo: somePhoto,
      }}
      onSave={asyncAction('edit')}
      onCancel={action('cancel')}
    />
  ))
