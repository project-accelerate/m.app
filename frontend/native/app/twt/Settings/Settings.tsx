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
import * as theme from '../../../theme'
import Constants from 'expo-constants'

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
  consentToContact: boolean
  onOptOut: () => void
}

export class Settings extends React.Component<SettingsProps> {
  render() {
    return (
      <Rows>
        <Description>Version {Constants.manifest.version}</Description>
        <Header>Privacy</Header>
        <PrivacyPanel {...this.props} />
      </Rows>
    )
  }
}

function PrivacyPanel(props: SettingsProps) {
  if (props.consentToContact) {
    return (
      <Rows>
        <Description>
          <Typography>
            Information that you provide to us will be used to communicate with
            you about Momentum's campaigns, campaigns we support, and how you
            can support and be part of them.
          </Typography>

          <Typography>
            If you prefer, you can{' '}
            <Typography accent onPress={props.onOptOut}>
              opt out
            </Typography>{' '}
            and we’ll remove all data associated with you in this app. For more
            information please see our{' '}
            <Link accent href="https://peoplesmomentum.com/privacy-policy/">
              privacy policy
            </Link>.
          </Typography>
        </Description>
      </Rows>
    )
  } else {
    return (
      <Description>
        You have not opted in to being contacted by Momentum.
      </Description>
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
      <Paragraphs variant="body">{props.children}</Paragraphs>
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
