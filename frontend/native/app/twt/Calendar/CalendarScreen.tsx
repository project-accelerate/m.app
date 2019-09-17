import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import { SavedEventCalendar } from './CalendarController'
import { isSameDay } from 'date-fns'
import { createParametricStateConnector } from '../../../state'
import * as calendar from './calendarState'
import { EventDetailScreen } from '../Event/EventDetailScreen'
import { BasicScreen } from '../../common/Screen/BasicScreen'
import { Routes } from '../../../routes'

interface CalendarScreenState {
  selectedDate: Date
}

const Connect = createParametricStateConnector<{ day: Date }>()(() => ({
  events: calendar.selectors.eventsInDay,
}))

export class CalendarScreen extends React.Component<
  NavigationScreenProps,
  CalendarScreenState
> {
  static navigationOptions: NavigationScreenOptions = {
    drawerLabel: 'My Calendar',
    headerTitle: 'Calendar',
  }

  state: CalendarScreenState = {
    selectedDate:
      calendar.days.find(day => isSameDay(day, new Date())) || calendar.days[0],
  }

  handlePress = (event?: calendar.SavedEventDetails) => {
    if (!event) {
      return
    }
    Routes.get().push(this.props.navigation, EventDetailScreen, {
      id: event.id,
      title: event.name,
      image: event.imageUrl,
    })
  }

  handleDayChange = (selectedDate: Date) => {
    this.setState({ selectedDate })
  }

  render() {
    return (
      <BasicScreen>
        <Connect day={this.state.selectedDate}>
          {({ events }) => (
            <SavedEventCalendar
              events={events}
              activeDay={this.state.selectedDate}
              dayOptions={calendar.days}
              onDayChanged={this.handleDayChange}
              onEventPress={id =>
                this.handlePress(events.find(e => e.id === id))
              }
            />
          )}
        </Connect>
      </BasicScreen>
    )
  }
}
