import React from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationScreenOptions } from 'react-navigation'
import { BasicScreen } from '../../common/Screen/BasicScreen'
import { Rows, Spacing, FormField, Columns } from '../../common/Widgets/Widgets'
import {
  Typography,
  Paragraphs,
  Link,
} from '../../common/Typography/Typography'
import { theme } from '../../../theme'
import { Formik } from 'formik'
import { Button } from '../../common/Butttons/Buttons'
import { Background } from '../../common/Layouts/Layouts'

const styles = StyleSheet.create({
  header: {
    padding: theme.spacing.level(1),
  },
  description: {
    padding: theme.spacing.level(1),
  },
})

export class SettingsScreen extends React.Component {
  static navigationOptions: NavigationScreenOptions = {
    drawerLabel: 'Settings',
    headerTitle: 'Settings',
  }

  render() {
    return (
      <BasicScreen>
        <Background solid>
          <Rows>
            <Header>Privacy</Header>
            <Description>
              <Paragraphs>
                <Typography>
                  You gave us your email address when you started using the app.
                </Typography>
                <Typography>
                  We’ll use this to communicate with you about Momentum's
                  campaigns, campaigns we support, and how you can support and
                  be part of them.
                </Typography>
                <Typography>
                  If you prefer, you can opt out and we’ll remove this data. For
                  more information please see our{' '}
                  <Link accent href="">
                    privacy policy
                  </Link>.
                </Typography>
                <Spacing />
              </Paragraphs>
            </Description>
            <Rows center>
              <Button>Opt out</Button>
            </Rows>
          </Rows>
        </Background>
      </BasicScreen>
    )
  }
}

function Header(props: React.Props<{}>) {
  return (
    <View style={styles.header}>
      <Typography accent variant="cardTitle">
        {props.children}
      </Typography>
    </View>
  )
}

function Description(props: React.Props<{}>) {
  return (
    <View style={styles.description}>
      <Typography variant="body">{props.children}</Typography>
    </View>
  )
}

function Toggle(props: { value: true; children?: React.ReactNode }) {
  return (
    <View style={styles.header}>
      <Typography darkBg variant="cardTitle">
        {props.children}
      </Typography>
    </View>
  )
}
