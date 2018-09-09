import React from 'react'
import { startOfDay, format, getHours, getDate, isSameDay } from 'date-fns'
import {
  Connection,
  ConnectionList,
} from '../../common/ConnectionList/ConnectionList'
import { EventListItemFragment } from '../../../queries'
import { EventListItem, EventListItemPressedEvent } from './EventListItem'
import { longDateOf } from '../../common/date-formats'
import { calendar } from '../Calendar/calendarState'
import { Toolbar, ToolbarRadio } from '../../common/Widgets/Widgets'
import { View } from 'react-native'
import { TimeBlock } from './TimetableScreen'

export interface EventListProps {
  activeDay: Date
  onEventPress: (event: EventListItemPressedEvent) => void
  data: Connection<EventListItemFragment>
  dayOptions: Date[]
  onDayChanged: (day: Date) => void
  sectionBy: (startTime: string) => TimeBlock
}

export class DayEventList extends React.Component<EventListProps> {
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
        <ConnectionList
          data={this.props.data}
          renderItem={event =>
            calendar.isSameCalendarDay(
              event.startTime,
              this.props.activeDay,
            ) ? (
              <EventListItem onPress={this.props.onEventPress} event={event} />
            ) : null
          }
          sectionBy={event => this.props.sectionBy(event.startTime).heading}
          renderSection={x => x}
        />
      </View>
    )
  }
}
