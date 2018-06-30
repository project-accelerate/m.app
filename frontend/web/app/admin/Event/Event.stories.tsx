import React from 'react'
import faker from 'faker'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { storyWrapper } from 'frontend.web/storybook/storyWrapper'
import { EventAdminCard } from 'frontend.web/app/admin/Event/EventAdminCard'

import somePhoto from 'common/test/somePhoto.jpg'
import { somePostcode } from 'common/test/testUtils'
import { EditEventForm } from 'frontend.web/app/admin/Event/EditEventForm'
import { asyncAction } from 'frontend.web/storybook/actions'

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
                id: '1',
                name: faker.name.findName(),
              },
            },
            {
              node: {
                id: '2',
                name: faker.name.findName(),
              },
            },
          ],
        },
        venue: {
          id: '1',
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
                id: '1',
                name: faker.name.findName(),
              },
            },
            {
              node: {
                id: '2',
                name: faker.name.findName(),
              },
            },
          ],
        },
        venue: {
          id: '1',
          name: faker.commerce.productName(),
        },
        photo: { sourceUrl: somePhoto },
      }}
      onEdit={action('edit')}
    />
  ))
  .add('Edit Form', () => (
    <EditEventForm
      title="Do Something"
      initial={{
        name: faker.lorem.words(3),
        venue: '1',
        speakers: ['1', '2'],
        introduction: faker.lorem.paragraph(3),
        detail: faker.lorem.paragraphs(3),
        startTime: faker.date.future().toString(),
        endTime: faker.date.future().toString(),
        photo: somePhoto,
      }}
      venueOptions={[
        { name: faker.commerce.productName(), id: '1' },
        { name: faker.commerce.productName(), id: '2' },
      ]}
      speakerOptions={[
        { name: faker.name.findName(), id: '1' },
        { name: faker.name.findName(), id: '2' },
        { name: faker.name.findName(), id: '3' },
        { name: faker.name.findName(), id: '4' },
      ]}
      onSave={asyncAction('save')}
      onCancel={action('cancel')}
    />
  ))
