import React from 'react'
import {
  startOfDay,
  format,
  isSameDay,
  subHours,
  startOfHour,
  startOfMinute,
} from 'date-fns'
import {
  Connection,
  ConnectionList,
} from '../../common/ConnectionList/ConnectionList'
import { EventListItemFragment } from '../../../queries'
import { EventListItem, EventListItemPressedEvent } from './EventListItem'
import { longDateOf, timeOf } from '../../common/date-formats'
import * as calendar from '../Calendar/calendarState'
import { View, StyleSheet } from 'react-native'
import { ToolbarRadio, Toolbar } from '../../common/Widgets/Widgets'

export interface EventListProps {
  onEventPress: (event: EventListItemPressedEvent) => void
  data: Connection<EventListItemFragment>
}

export interface EventListState {
  currentDate: Date
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  container: {
    height: '100%',
  },
})

export class EventList extends React.Component<EventListProps, EventListState> {
  state: EventListState = {
    currentDate:
      calendar.days.find(day => isSameDay(day, new Date())) || calendar.days[0],
  }

  render() {
    const { data, onEventPress } = this.props

    return (
      <View style={styles.container}>
        <Toolbar>
          {calendar.days.map(currentDate => (
            <ToolbarRadio
              active={isSameDay(currentDate, this.state.currentDate)}
              key={currentDate.toISOString()}
              onPress={() => this.setState({ currentDate })}
            >
              {format(currentDate, 'ddd')}
            </ToolbarRadio>
          ))}
        </Toolbar>
        <ConnectionList
          key={this.state.currentDate.toISOString()}
          style={styles.list}
          data={data}
          filter={x => isSameDay(x.startTime, this.state.currentDate)}
          renderItem={event => (
            <EventListItem onPress={onEventPress} event={event} />
          )}
          sortKey="startTime"
          sectionBy={event => startOfMinute(event.startTime).toISOString()}
          renderSection={timeOf}
        />
      </View>
    )
  }
}
