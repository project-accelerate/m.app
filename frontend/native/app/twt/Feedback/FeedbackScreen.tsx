import { StyleSheet, WebView } from 'react-native'
import React from 'react'
import {
  NavigationScreenOptions,
  NavigationInjectedProps,
} from 'react-navigation'
import { BasicScreen } from '../../common/Screen/BasicScreen'
import { Columns, Rows } from '../../common/Widgets/Widgets'
import { Button } from '../../common/Butttons/Buttons'
import { Typography } from '../../common/Typography/Typography'
import { Routes } from '../../../routes'
import { createWebScreen } from '../../common/WebScreen/createWebScreen'
import { theme } from '../../../theme'

export const SessionFeedbackScreen = createWebScreen({
  title: 'Session Feedback',
  url: 'https://goo.gl/forms/Qg280HoLw60ahMkB2',
})
export const TWTFeedbackScreen = createWebScreen({
  title: 'TWT Feedback',
  url: 'https://goo.gl/forms/6rpvz1Qf4e0HNxLj2',
})

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  header: {
    marginTop: theme.spacing.level(5),
  },
  item: {
    marginTop: theme.spacing.level(3),
    margin: theme.spacing.level(2),
  },
  button: {
    margin: theme.spacing.level(1),
  },
})

export class FeedbackScreen extends React.Component<NavigationInjectedProps> {
  static navigationOptions: NavigationScreenOptions = {
    drawerLabel: 'Feedback',
    headerTitle: 'Feedback',
  }

  render() {
    return (
      <BasicScreen>
        <Rows center style={styles.root}>
          <Typography style={styles.header} variant="display">
            How have you found TWT?
          </Typography>

          <Rows style={styles.item}>
            <Button
              style={styles.button}
              onPress={() =>
                Routes.get().push(this.props.navigation, SessionFeedbackScreen)
              }
            >
              Session Feedback
            </Button>
            <Typography variant="body">
              Give feedback about a session you have attended
            </Typography>
          </Rows>

          <Rows style={styles.item}>
            <Button
              style={styles.button}
              onPress={() =>
                Routes.get().push(this.props.navigation, TWTFeedbackScreen)
              }
            >
              TWT Feedback
            </Button>
            <Typography variant="body">
              Give feedback about the TWT festival in general
            </Typography>
          </Rows>
        </Rows>
      </BasicScreen>
    )
  }
}
