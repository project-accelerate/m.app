import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Formik, FormikHandlers, FormikProps } from 'formik'
import * as Yup from 'yup'
import { Button } from '../../common/Butttons/Buttons'
import {
  Typography,
  Link,
  Paragraphs,
} from '../../common/Typography/Typography'
import { theme } from '../../../theme'
import { FormField, Spacing, Rows } from '../../common/Widgets/Widgets'
import { RegistrationStageProps } from './RegistrationContainer'

const styles = StyleSheet.create({
  bg: {
    backgroundColor: theme.pallete.accent,
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  container: {
    paddingHorizontal: theme.spacing.level(2),
    paddingVertical: theme.spacing.level(3),
    backgroundColor: theme.pallete.box,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.level(2),
  },
  button: {
    flex: 1,
    margin: theme.spacing.level(1),
  },
  privacy: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
})

export function RegistrationIsDelegateQuestion(props: RegistrationStageProps) {
  return (
    <RegistrationPanel>
      <RegistrationPrompt>Are you a conference delegate?</RegistrationPrompt>

      <RegistrationActions>
        <Button
          style={styles.button}
          onPress={() => props.onSubmit({ isConferenceDelegate: false })}
        >
          I’m not a delegate
        </Button>

        <Button
          style={styles.button}
          onPress={() => props.onSubmit({ isConferenceDelegate: true })}
        >
          I am a delegate
        </Button>
      </RegistrationActions>

      <RegistrationHelpText>
        We'll use this to keep the news and events we send you relevant.
      </RegistrationHelpText>
    </RegistrationPanel>
  )
}

export function AcceptNotificationsPanel(props: RegistrationStageProps) {
  return (
    <RegistrationPanel>
      <RegistrationPrompt>
        Can we send you mobile notifications during conference?
      </RegistrationPrompt>

      <RegistrationActions>
        <Button
          style={styles.button}
          onPress={() => props.onSubmit({ optedIntoNotifications: false })}
        >
          No
        </Button>
        <Button
          style={styles.button}
          onPress={() => props.onSubmit({ optedIntoNotifications: true })}
        >
          Yes
        </Button>
      </RegistrationActions>

      <RegistrationHelpText>
        We’ll use this to keep you notified about important conference news and
        events.
      </RegistrationHelpText>
    </RegistrationPanel>
  )
}

export function RegistrationAskEmailPanel(props: RegistrationStageProps) {
  return (
    <Formik
      onSubmit={(value: { email: string }) =>
        props.onSubmit({ email: value.email })
      }
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
      })}
      initialValues={{ email: '' }}
      render={({ handleSubmit, isValid }: FormikProps<{}>) => (
        <RegistrationPanel>
          <RegistrationPrompt>
            Keep in touch after conference
          </RegistrationPrompt>

          <RegistrationActions>
            <FormField
              name="email"
              type="email"
              placeholder="Enter your email address"
            />
          </RegistrationActions>

          <RegistrationActions>
            <Button style={styles.button} onPress={props.onSkip}>
              Skip
            </Button>
            <Button
              disabled={!isValid}
              style={styles.button}
              onPress={handleSubmit}
            >
              Keep me updated
            </Button>
          </RegistrationActions>

          <RegistrationHelpText>
            <Typography>
              By giving us your email address you are consenting to receive
              communications about Momentum's campaigns, campaigns we support,
              and how you can support and be part of them.
            </Typography>
            <Typography>
              For more information please see our{' '}
              <Link accent href="https://peoplesmomentum.com/privacy-policy/">
                privacy policy
              </Link>.
            </Typography>
          </RegistrationHelpText>
        </RegistrationPanel>
      )}
    />
  )
}

export function RegistrationBg({ children }: React.Props<{}>) {
  return <View style={styles.bg}>{children}</View>
}

function RegistrationPanel({ children }: React.Props<{}>) {
  return <View style={styles.container}>{children}</View>
}

function RegistrationPrompt({ children }: React.Props<{}>) {
  return (
    <Rows center>
      <Image source={require('./check.png')} />

      <Spacing level={2} />

      <Typography center variant="wizardTitle">
        {children}
      </Typography>
    </Rows>
  )
}

function RegistrationHelpText({ children }: React.Props<{}>) {
  return <Paragraphs variant="small">{children}</Paragraphs>
}

function RegistrationActions({ children }: React.Props<{}>) {
  return <View style={styles.actions}>{children}</View>
}
