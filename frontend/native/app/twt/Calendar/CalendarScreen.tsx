import React from 'react'
import { CalendarView, CalendarEvent } from './Calendar'
import { NavigationScreenOptions } from 'react-navigation'
import { times } from 'lodash'
import { Screen, Toolbar, ToolbarRadio } from '../../common/Widgets/Widgets'
import { SavedEventCalendar } from './CalendarController'
import { lorem } from 'faker'
import { addHours } from 'date-fns'

export class CalendarScreen extends React.Component {
  static navigationOptions: NavigationScreenOptions = {
    drawerLabel: 'My Calendar',
    headerTitle: 'Calendar',
  }

  now = new Date()

  handlePress = () => {}

  render() {
    return (
      <Screen>
        <SavedEventCalendar
          now={this.now}
          events={times(5, i => ({
            id: String(i),
            name: lorem.words(3),
            start: addHours(this.now, i * 2).toISOString(),
            end: addHours(this.now, i * 2 + 1).toISOString(),
          }))}
          onEventPress={this.handlePress}
        />
      </Screen>
    )
  }
}
