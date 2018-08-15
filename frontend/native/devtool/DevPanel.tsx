import React from 'react'
import { AsyncStorage } from 'react-native'
import { Button } from '../app/common/Butttons/Buttons'
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
        <Button onPress={() => AsyncStorage.clear()}>Reset Everything</Button>
      </Screen>
    )
  }
}
