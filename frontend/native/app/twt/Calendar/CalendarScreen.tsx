import React from 'react'
import { CalendarView, CalendarEvent } from './Calendar'
import { NavigationScreenOptions } from 'react-navigation'
import { times } from 'lodash'
import { Screen, Toolbar, ToolbarRadio } from '../../common/Widgets/Widgets'
import { SavedEventCalendar } from './CalendarController'

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
        <SavedEventCalendar now={this.now} onEventPress={this.handlePress} />
      </Screen>
    )
  }
}
