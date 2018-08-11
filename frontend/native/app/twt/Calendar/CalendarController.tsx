import React from 'react'
import { View } from 'react-native'
import { Toolbar, ToolbarRadio } from '../../common/Widgets/Widgets'
import { CalendarView, CalendarEvent } from './Calendar'

interface SavedEventCalendarProps {
  now: Date
  events: SavedEvent[]
  onEventPress: (id: string) => void
}

interface SavedEvent {
  id: string
  name: string
  start: string
  end: string
}

export class SavedEventCalendar extends React.Component<
  SavedEventCalendarProps
> {
  now = new Date()

  handleEventPress = (id: string) => {}

  handleDatePress = () => {}

  render() {
    return (
      <View>
        <Toolbar>
          <ToolbarRadio active onPress={this.handleDatePress}>
            22 Sep
          </ToolbarRadio>
          <ToolbarRadio onPress={this.handleDatePress}>23 Sep</ToolbarRadio>
          <ToolbarRadio onPress={this.handleDatePress}>24 Sep</ToolbarRadio>
          <ToolbarRadio onPress={this.handleDatePress}>25 Sep</ToolbarRadio>
        </Toolbar>
        <CalendarView now={this.now}>
          {this.props.events.map(event => (
            <CalendarEvent
              key={event.id}
              id={event.id}
              title={event.name}
              start={new Date(event.start)}
              end={new Date(event.end)}
              onPress={this.handleEventPress}
            />
          ))}
        </CalendarView>
      </View>
    )
  }
}
