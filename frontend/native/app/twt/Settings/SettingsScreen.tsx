import React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
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
import { createFetchData } from '../../common/FetchData/FetchData'
import { UserSettingsQuery, UserSettingsQueryVariables } from '../../../queries'
import UserSettingsQueryDoc from './UserSettings.graphql'

const Connect = createStateConnector(() => ({
  userId: registration.selectors.userId,
}))

const FetchData = createFetchData<
  UserSettingsQuery,
  UserSettingsQueryVariables
>({
  query: UserSettingsQueryDoc,
})

export class SettingsScreen extends React.Component {
  static navigationOptions: NavigationScreenOptions = {
    drawerLabel: 'Settings',
    headerTitle: 'Settings',
  }

  render() {
    return (
      <Connect>
        {({ userId }) => (
          <FetchData variables={{ id: userId }}>
            {({ data }) => (
              <BasicScreen>
                <Background solid>
                  <Spacing level={2} />
                  <Settings
                    consentToContact={data.user.consentToContact}
                    onOptOut={() => {
                      Alert.alert(
                        'Are you sure?',
                        'Do you want to opt out of being contacted by Momentum?',
                        [
                          { style: 'cancel', text: 'Cancel' },
                          {
                            style: 'destructive',
                            text: 'Opt Out',
                            onPress: async () => {
                              await settings.privacyOptOut({ id: userId })
                              await new Promise(resolve =>
                                setTimeout(resolve, 2000),
                              )

                              notifyUser('Your settings have been updated')
                            },
                          },
                        ],
                      )
                    }}
                  />
                </Background>
              </BasicScreen>
            )}
          </FetchData>
        )}
      </Connect>
    )
  }
}
