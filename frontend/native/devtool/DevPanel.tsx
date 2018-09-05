import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Updates } from 'expo'
import { Button } from '../app/common/Butttons/Buttons'
import { NavigationScreenOptions } from 'react-navigation'
import { WithActions } from '../state'
import { BasicScreen } from '../app/common/Screen/BasicScreen'

export class DevPanel extends React.Component {
  static navigationOptions: NavigationScreenOptions = {
    drawerLabel: 'Developer',
    headerTitle: 'Developer',
  }

  resetEverything = () => {
    AsyncStorage.clear()
    Notifications.cancelAllScheduledNotificationsAsync()
    Updates.reload()
  }

  render() {
    return (
      <WithActions>
        {({ actions }) => (
          <BasicScreen>
            <Button onPress={this.resetEverything}>Reset Everything</Button>
            <Button onPress={actions.calendar.showTestEventNotification}>
              Show Event Notification
            </Button>
          </BasicScreen>
        )}
      </WithActions>
    )
  }
}
