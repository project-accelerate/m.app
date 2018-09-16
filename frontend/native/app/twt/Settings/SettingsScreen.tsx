import React from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationScreenOptions } from 'react-navigation'
import { BasicScreen } from '../../common/Screen/BasicScreen'
import {
  LoadingOverlay,
  notifyUser,
  Spacing,
} from '../../common/Widgets/Widgets'
import {
  Typography,
  Paragraphs,
  Link,
} from '../../common/Typography/Typography'
import { Background } from '../../common/Layouts/Layouts'
import { Settings } from './Settings'
import { settings } from './settingsState'
import { createStateConnector } from '../../../state'
import { registration } from '../Registration/registrationState'
import Toast from 'react-native-root-toast'

const Connect = createStateConnector(() => ({
  userId: registration.selectors.userId,
}))

export class SettingsScreen extends React.Component {
  static navigationOptions: NavigationScreenOptions = {
    drawerLabel: 'Settings',
    headerTitle: 'Settings',
  }

  render() {
    return (
      <Connect>
        {({ userId }) => (
          <BasicScreen>
            <Background solid>
              <Spacing level={2} />
              <Settings
                onOptOut={async () => {
                  await settings.privacyOptOut({ id: userId })
                  await new Promise(resolve => setTimeout(resolve, 2000))

                  notifyUser('Your settings have been updated')
                }}
              />
            </Background>
          </BasicScreen>
        )}
      </Connect>
    )
  }
}
