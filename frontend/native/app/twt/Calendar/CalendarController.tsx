import React from 'react'
import { View } from 'react-native'
import {
  Toolbar,
  ToolbarRadio,
  Rows,
  Spacing,
} from '../../common/Widgets/Widgets'
import { CalendarView, CalendarEvent } from './Calendar'
import { calendar } from './calendarState'
import { isSameDay, format, addHours, startOfDay, addDays, min } from 'date-fns'
import { Typography } from '../../common/Typography/Typography'

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
      <View style={{ flex: 1 }}>
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

        <Spacing level={2} />

        <Rows center>
          <Typography variant="body" accent>
            {format(this.props.activeDay, 'dddd Do MMMM')}
          </Typography>
        </Rows>

        <Spacing level={2} />

        <CalendarView
          style={{ flex: 1 }}
          key={this.props.activeDay.toString()}
          startTime={this.startTime}
          endTime={this.endTime}
          events={this.props.events.map(event => ({
            id: event.id,
            title: event.name,
            start: new Date(event.startTime),
            end: new Date(event.endTime),
            onPress: this.props.onEventPress,
          }))}
        />
      </View>
    )
  }
}
