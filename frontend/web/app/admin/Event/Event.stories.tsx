import React from 'react'
import faker from 'faker'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { storyWrapper } from 'frontend.web/storybook/storyWrapper'
import { EventAdminCard } from 'frontend.web/app/admin/Event/EventAdminCard'

import somePhoto from 'common/test/somePhoto.jpg'
import { somePostcode } from 'common/test/testUtils'

storiesOf('Event Admin', module)
  .addDecorator(storyWrapper())
  .add('Card (No Image)', () => (
    <EventAdminCard
      event={{
        id: faker.random.uuid(),
        name: `${faker.commerce.productName()}`,
        introduction: faker.lorem.paragraph(),
        detail: faker.lorem.paragraphs(5),
        startTime: faker.date.future().toJSON(),
        endTime: faker.date.future().toJSON(),
        speakers: {
          edges: [
            {
              node: {
                name: faker.name.findName(),
              },
            },
            {
              node: {
                name: faker.name.findName(),
              },
            },
          ],
        },
        venue: {
          name: faker.commerce.productName(),
        },
        photo: null,
      }}
      onEdit={action('edit')}
    />
  ))
  .add('Card (Image)', () => (
    <EventAdminCard
      event={{
        id: faker.random.uuid(),
        name: `${faker.commerce.productName()}`,
        introduction: faker.lorem.paragraph(),
        detail: faker.lorem.paragraphs(5),
        startTime: faker.date.future().toJSON(),
        endTime: faker.date.future().toJSON(),
        speakers: {
          edges: [
            {
              node: {
                name: faker.name.findName(),
              },
            },
            {
              node: {
                name: faker.name.findName(),
              },
            },
          ],
        },
        venue: {
          name: faker.commerce.productName(),
        },
        photo: { sourceUrl: somePhoto },
      }}
      onEdit={action('edit')}
    />
  ))
