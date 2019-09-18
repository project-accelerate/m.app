import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import * as faker from 'faker'
import { storyWrapper } from '../../storybook/storyWrapper'
import { AppWrapper } from '../common/AppWrapper/AppWrapper'
import { EventFeedCardFragment } from '../../queries'
import {
  EventFeedContainer,
  EventFeedSearchbar,
  EventFeedInitialContent,
  EventFeedEmptyContent,
  EventFeed,
} from './EventFeed'
import { LoadingIndicator } from '../common/LoadData/LoadingIndicator'
import { EventFamily } from 'common/domain/EventFamily'

storiesOf('EventFeed', module)
  .addDecorator(storyWrapper())
  .add('With events', () => (
    <AppWrapper>
      <EventFeedContainer>
        <ExampleSearchBar />
        <EventFeed
          events={[
            someEvent(),
            someEvent(),
            someEvent(),
            someEvent(),
            someEvent(),
          ]}
        />
      </EventFeedContainer>
    </AppWrapper>
  ))
  .add('Loading', () => (
    <AppWrapper>
      <EventFeedContainer>
        <ExampleSearchBar />
        <LoadingIndicator />
      </EventFeedContainer>
    </AppWrapper>
  ))
  .add('Initial state', () => (
    <AppWrapper>
      <EventFeedContainer>
        <EventFeedInitialContent onSearch={action('search')} />
      </EventFeedContainer>
    </AppWrapper>
  ))
  .add('Empty state', () => (
    <AppWrapper>
      <EventFeedContainer>
        <ExampleSearchBar />
        <EventFeedEmptyContent />
      </EventFeedContainer>
    </AppWrapper>
  ))

const ExampleSearchBar = () => (
  <EventFeedSearchbar
    postcode="OX49"
    radiusInMiles={5}
    onPostcodeChange={action('postcodeChange')}
    onRadiusChange={action('radiusChange')}
  />
)

function someEvent(): EventFeedCardFragment {
  return {
    id: faker.random.uuid(),
    name: faker.lorem.words(4),
    family: EventFamily.TWT,
    venue: {
      id: faker.random.uuid(),
      name: faker.lorem.words(2),
      address: {
        postcode: 'BN2',
      },
    },
    startTime: faker.date.future().toJSON(),
    endTime: faker.date.future().toJSON(),
    introduction: faker.lorem.paragraphs(2),
  }
}
