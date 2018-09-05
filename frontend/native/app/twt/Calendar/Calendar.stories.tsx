import React from 'react'
import { CalendarEvent, CalendarView } from './Calendar'
import { SavedEventCalendar } from './CalendarController'

export const stories = {
  'whole screen': () => (
    <SavedEventCalendar
      activeDay={new Date('2010-01-01')}
      dayOptions={[
        new Date('2010-01-01'),
        new Date('2010-01-02'),
        new Date('2010-01-03'),
      ]}
      events={[
        {
          id: '1',
          name: 'A New Populism?',
          startTime: time(18.3).toISOString(),
          endTime: time(20, 0).toISOString(),
          venueName: 'Corn Exchange',
        },
        {
          id: '2',
          name: 'In and Against the State',
          startTime: time(21).toISOString(),
          endTime: time(22, 0).toISOString(),
          venueName: 'Newspeak House',
        },
      ]}
      onEventPress={console.log}
      onDayChanged={console.log}
    />
  ),
  empty: () => <CalendarView {...defaultTimes} events={[]} />,
  'with events': () => (
    <CalendarView
      {...defaultTimes}
      events={[
        {
          id: 'a',
          title: 'Utopia Now!',
          start: time(14, 30),
          end: time(17),
          onPress: console.log,
        },
        {
          id: 'a',
          title: 'Eat the Rich',
          start: time(12),
          end: time(13),
          onPress: console.log,
        },
      ]}
    />
  ),
  'with clashing events': () => (
    <CalendarView
      {...defaultTimes}
      events={[
        {
          id: 'a',
          title: 'Utopia Now!',
          start: time(12, 30),
          end: time(15),
          onPress: console.log,
        },
        {
          id: 'a',
          title: 'Eat the Rich',
          start: time(12),
          end: time(13),
          onPress: console.log,
        },
      ]}
    />
  ),
}

function time(hours: number, minutes: number = 0) {
  const date = new Date('2010-01-01')
  date.setHours(hours)
  date.setMinutes(minutes)

  return date
}

const defaultTimes = {
  startTime: time(11, 0),
  endTime: time(23, 0),
}
