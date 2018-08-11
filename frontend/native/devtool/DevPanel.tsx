import React from 'react'
import { View, AsyncStorage } from 'react-native'
import { Button } from '../app/common/Butttons/Buttons'
import { clearDeviceRegistrationState } from '../app/twt/Registration/DeviceRegistrationState'
import { NavigationScreenOptions } from 'react-navigation'
import { Screen } from '../app/common/Widgets/Widgets'

export class DevPanel extends React.Component {
  static navigationOptions: NavigationScreenOptions = {
    drawerLabel: 'Developer',
    headerTitle: 'Developer',
  }

  render() {
    return (
      <Screen>
        <Button onPress={() => clearDeviceRegistrationState()}>
          Clear Registration
        </Button>
        <Button onPress={() => AsyncStorage.clear()}>Reset Everything</Button>
      </Screen>
    )
  }
}
