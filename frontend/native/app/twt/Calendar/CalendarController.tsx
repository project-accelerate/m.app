import React from 'react'
import { View } from 'react-native'
import { Toolbar, ToolbarRadio } from '../../common/Widgets/Widgets'
import { CalendarView, CalendarEvent } from './Calendar'
import { calendar } from './calendarState'
import {
  isSameDay,
  format,
  addHours,
  startOfDay,
  addDays,
  max,
  min,
} from 'date-fns'

interface SavedEventCalendarProps {
  activeDay: Date
  dayOptions: Date[]
  events: calendar.SavedEventDetails[]
  onEventPress: (id: string) => void
  onDayChanged: (day: Date) => void
}

export class SavedEventCalendar extends React.Component<
  SavedEventCalendarProps
> {
  initialTime = new Date()

  get startOfCalendarDay() {
    return addHours(startOfDay(this.props.activeDay), calendar.startHourOfDay)
  }

  get startTime() {
    const firstEvent = this.props.events[0]
    const defaultStart = addHours(this.startOfCalendarDay, 6)

    return firstEvent ? min(firstEvent.startTime, defaultStart) : defaultStart
  }

  get endTime() {
    return addDays(this.startOfCalendarDay, 1)
  }

  render() {
    return (
      <View>
        <Toolbar>
          {this.props.dayOptions.map(day => (
            <ToolbarRadio
              active={isSameDay(day, this.props.activeDay)}
              key={day.toISOString()}
              onPress={() => this.props.onDayChanged(day)}
            >
              {format(day, 'ddd')}
            </ToolbarRadio>
          ))}
        </Toolbar>

        <CalendarView
          now={this.initialTime}
          startTime={this.startTime}
          endTime={this.endTime}
        >
          {this.props.events.map(event => (
            <CalendarEvent
              key={event.id}
              id={event.id}
              title={event.name}
              start={new Date(event.startTime)}
              end={new Date(event.endTime)}
              onPress={this.props.onEventPress}
            />
          ))}
        </CalendarView>
      </View>
    )
  }
}
