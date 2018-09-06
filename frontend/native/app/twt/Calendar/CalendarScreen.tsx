import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'
import { SavedEventCalendar } from './CalendarController'
import { isSameDay } from 'date-fns'
import { createParametricStateConnector } from '../../../state'
import { calendar } from './calendarState'
import { EventDetailScreen } from '../Event/EventDetailScreen'
import { BasicScreen } from '../../common/Screen/BasicScreen'

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

  // HACK: Hardcoodeed yeah
  days = [
    new Date('2018-09-22'),
    new Date('2018-09-23'),
    new Date('2018-09-24'),
    new Date('2018-09-25'),
  ]

  state: CalendarScreenState = {
    selectedDate:
      this.days.find(day => isSameDay(day, new Date())) || this.days[0],
  }

  handlePress = (id: string) => {
    this.props.navigation.push(EventDetailScreen.name, {
      id,
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
              dayOptions={this.days}
              onDayChanged={this.handleDayChange}
              onEventPress={this.handlePress}
            />
          )}
        </Connect>
      </BasicScreen>
    )
  }
}
