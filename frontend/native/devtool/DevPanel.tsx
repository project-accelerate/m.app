import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import { Button } from '../app/common/Butttons/Buttons'
import { NavigationScreenOptions } from 'react-navigation'
import { Screen } from '../app/common/Widgets/Widgets'
import { addSeconds } from 'date-fns'
import { WithActions } from '../state'

export class DevPanel extends React.Component {
  static navigationOptions: NavigationScreenOptions = {
    drawerLabel: 'Developer',
    headerTitle: 'Developer',
  }

  resetEverything = () => {
    AsyncStorage.clear()
    Notifications.cancelAllScheduledNotificationsAsync()
  }

  render() {
    return (
      <WithActions>
        {({ actions }) => (
          <Screen>
            <Button onPress={this.resetEverything}>Reset Everything</Button>
            <Button onPress={actions.calendar.showTestEventNotification}>
              Show Event Notification
            </Button>
          </Screen>
        )}
      </WithActions>
    )
  }
}
