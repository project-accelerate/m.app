import React from 'react'
import { startOfDay, format } from 'date-fns'
import {
  Connection,
  ConnectionList,
} from '../../common/ConnectionList/ConnectionList'
import { EventListItemFragment } from '../../../queries'
import { EventListItem } from './EventListItem'

export function EventList(props: { data?: Connection<EventListItemFragment> }) {
  return (
    <ConnectionList
      data={props.data}
      renderItem={event => <EventListItem event={event} />}
      sectionBy={event => startOfDay(event.startTime).toISOString()}
      renderSection={dateTime => format(dateTime, 'Do MMM')}
    />
  )
}
