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
import { Button, ActionButton } from '../../common/Butttons/Buttons'
import { Background } from '../../common/Layouts/Layouts'

const styles = StyleSheet.create({
  header: {
    paddingVertical: theme.spacing.level(1),
    paddingHorizontal: theme.spacing.level(2),
  },
  description: {
    paddingVertical: theme.spacing.level(1),
    paddingHorizontal: theme.spacing.level(2),
  },
})

interface SettingsProps {
  onOptOut: () => Promise<void>
}

export class Settings extends React.Component<SettingsProps> {
  render() {
    return (
      <Rows>
        <Header>Privacy</Header>
        <Description>
          <Paragraphs>
            <Typography>
              Information that you provide to us will be used to communicate
              with you about Momentum's campaigns, campaigns we support, and how
              you can support and be part of them.
            </Typography>
            <Typography>
              If you prefer, you can opt out and we’ll remove all data we hold
              about you. For more information please see our{' '}
              <Link accent href="https://peoplesmomentum.com/privacy-policy/">
                privacy policy
              </Link>.
            </Typography>
            <Spacing />
          </Paragraphs>
        </Description>
        <Rows center>
          <ActionButton action={this.props.onOptOut}>Opt out</ActionButton>
        </Rows>
      </Rows>
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
