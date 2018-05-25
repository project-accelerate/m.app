import * as React from 'react'
import { storiesOf } from '@storybook/react';
import * as faker from 'faker'
import { storyWrapper } from '../../config/storyWrapper';
import { AppWrapper } from '../../components/AppWrapper/AppWrapper';
import { EventFeedContentItem, EventFeedContent } from './EventFeedContent';

storiesOf('EventFeed', module)
  .addDecorator(storyWrapper())
  .add('With events', () =>
    <AppWrapper>
      <EventFeedContent
        events={[
          someEvent(),
          someEvent(),
          someEvent(),
          someEvent(),
          someEvent()
        ]}
      />
    </AppWrapper>
  )

function someEvent(): EventFeedItem {
  return {
    name: faker.lorem.words(4),
    organiser: {
      name: faker.lorem.words(3),
    },
    venue: {
      name: faker.lorem.words(2),
      postcode: 'BN2'
    },
    startTime: faker.date.future().toJSON(),
    introduction: faker.lorem.paragraphs(2)
  }
}
