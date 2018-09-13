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
import { TimeBlock, EventType,  } from './TimetableScreen'

export interface EventListProps {
  activeDay: Date
  activeType: EventType
  onEventPress: (event: EventListItemPressedEvent) => void
  data: Connection<EventListItemFragment>
  dayOptions: Date[]
  eventTypeOptions: EventType[]
  onDayChanged: (day: Date) => void
  onTypeChanged: (eventType : EventType) => void
  checkEventType: (activeType:string, eventType:string)=> boolean
  sectionBy: (startTime: string) => TimeBlock
}



export class DayEventList extends React.Component<EventListProps> {
  render() {
    return (
      <View>
        <Toolbar>
          {this.props.eventTypeOptions.map(eventType => (
            <ToolbarRadio
              active={this.props.activeType.enumKey == eventType.enumKey}
              key={eventType.enumKey}
              onPress={() => this.props.onTypeChanged(eventType)}
            >
              {eventType.readable}
            </ToolbarRadio>
          ))}
        </Toolbar>
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
            )  && this.props.checkEventType(this.props.activeType.enumKey,event.family.toString()) ? (
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
