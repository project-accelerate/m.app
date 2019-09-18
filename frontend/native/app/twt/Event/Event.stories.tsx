import React from 'react'
import faker from 'faker'
import { EventList } from './EventList'
import {
  EventFamily,
  EventListItemFragment,
  EventDetailFragment,
} from '../../../queries'
import { Background } from '../../common/Layouts/Layouts'
import { EventDetail } from './EventDetail'

export const stories = {
  EventListItem: () => (
    <Background>
      <EventList
        onEventPress={event => console.log('press', event)}
        data={{
          edges: [eventItemNode(), eventItemNode(), eventItemNode()],
        }}
      />
    </Background>
  ),
  EventDetail: () => (
    <Background solid>
      <EventDetail
        canSave
        event={eventDetail()}
        onSpeakerPress={event => console.log('press', event)}
        onToggleFavourited={() => console.log('Toggle favourited')}
        favourited={false}
      />
    </Background>
  ),
}

function eventDetail(): EventDetailFragment {
  return {
    id: faker.random.uuid(),
    name: 'Novara Live: Utopia Now!',
    startTime: '2018-09-29T20:00:00.000Z',
    endTime: '2018-09-30T03:00:00.000Z',
    introduction: faker.lorem.paragraphs(1),
    detail: faker.lorem.paragraphs(5),
    photo: require('../../../test/novaraLogo.png'),
    venue: {
      id: faker.random.uuid(),
      name: 'Newspeak House',
      address: {
        streetAddress: '133 Bethnal Green Rd',
        postcode: 'E2 7DG',
        latitude: 51.525373,
        longitude: -0.071082,
      },
    },
    speakers: {
      edges: [
        {
          node: {
            id: faker.random.uuid(),
            name: faker.name.findName(),
            photo: require('../../../test/novaraLogo.png'),
          },
        },
        {
          node: {
            id: faker.random.uuid(),
            name: faker.name.findName(),
            photo: require('../../../test/novaraLogo.png'),
          },
        },
      ],
    },
  }
}

function eventItemNode(props: Partial<EventListItemFragment> = {}) {
  return {
    node: {
      id: faker.random.uuid(),
      name: 'Novara Live: Utopia Now!',
      family: EventFamily.TWT,
      venue: {
        id: '123',
        name: 'Newspeak house',
      },
      startTime: '2018-09-29T20:00:00.000Z',
      endTime: '2018-09-30T03:00:00.000Z',
      photo: require('../../../test/novaraLogo.png'),
      ...props,
    },
  }
}
