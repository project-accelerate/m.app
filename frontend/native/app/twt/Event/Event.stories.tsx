import React from 'react'
import faker from 'faker'
import { EventList } from './EventList'
import { EventFamily, EventListItemFragment } from '../../../queries'
import { Background } from '../../common/Layouts/Layouts'

export const stories = {
  EventListItem: () => (
    <Background>
      <EventList
        data={{
          edges: [eventItemNode(), eventItemNode(), eventItemNode()],
        }}
      />
    </Background>
  ),
}

function eventItemNode(props: Partial<EventListItemFragment> = {}) {
  return {
    node: {
      id: faker.random.uuid(),
      name: 'Novara Live: Utopia Now!',
      family: EventFamily.TWT_2018,
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
