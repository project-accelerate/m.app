import React from 'react'
import { CalendarEvent, CalendarView } from './Calendar'
import { SavedEventCalendar } from './CalendarController'

const now = time(18)

export const stories = {
  'whole screen': () => (
    <SavedEventCalendar
      now={now}
      events={[
        {
          id: '1',
          name: 'A New Populism?',
          start: time(18.3).toISOString(),
          end: time(20, 0).toISOString(),
        },
        {
          id: '2',
          name: 'In and Against the State',
          start: time(21).toISOString(),
          end: time(22, 0).toISOString(),
        },
      ]}
      onEventPress={console.log}
    />
  ),
  empty: () => <CalendarView now={now} />,
  'with events': () => (
    <CalendarView now={now}>
      <CalendarEvent
        id="a"
        title="Utopia Now!"
        start={time(14, 30)}
        end={time(17)}
        onPress={console.log}
      />
      <CalendarEvent
        id="b"
        title="Eat the Rich"
        start={time(12)}
        end={time(13)}
        onPress={console.log}
      />
    </CalendarView>
  ),
  'with clashing events': () => (
    <CalendarView now={now}>
      <CalendarEvent
        id="a"
        title="Utopia Now!"
        start={time(12.3)}
        end={time(15)}
        onPress={console.log}
      />
      <CalendarEvent
        id="b"
        title="Utopia Now!"
        start={time(12)}
        end={time(13)}
        onPress={console.log}
      />
    </CalendarView>
  ),
}

function time(hours: number, minutes: number = 0) {
  const date = new Date('2010-01-01')
  date.setHours(hours)
  date.setMinutes(minutes)

  return date
}
