import React from 'react'
import { startOfDay, format } from 'date-fns'
import {
  Connection,
  ConnectionList,
} from '../../common/ConnectionList/ConnectionList'
import { EventListItemFragment } from '../../../queries'
import { EventListItem, EventListItemPressedEvent } from './EventListItem'

interface EventListProps {
  onEventPress: (event: EventListItemPressedEvent) => void
  data: Connection<EventListItemFragment>
}

export function EventList({ data, onEventPress }: EventListProps) {
  return (
    <ConnectionList
      data={data}
      renderItem={event => (
        <EventListItem onPress={onEventPress} event={event} />
      )}
      sectionBy={event => startOfDay(event.startTime).toISOString()}
      renderSection={dateTime => format(dateTime, 'Do MMM')}
    />
  )
}
