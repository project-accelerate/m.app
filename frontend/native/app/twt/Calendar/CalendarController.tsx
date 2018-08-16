import React from 'react'
import { View } from 'react-native'
import { Toolbar, ToolbarRadio } from '../../common/Widgets/Widgets'
import { CalendarView, CalendarEvent } from './Calendar'
import { calendar } from './calendarState'
import { isSameDay, format, addHours, startOfDay, addDays } from 'date-fns'

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

  get startTime() {
    return addHours(startOfDay(this.props.activeDay), calendar.startHourOfDay)
  }

  get endTime() {
    return addDays(this.startTime, 1)
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
