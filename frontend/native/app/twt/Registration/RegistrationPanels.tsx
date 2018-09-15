import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Formik, FormikHandlers, FormikProps } from 'formik'
import * as Yup from 'yup'
import { Button } from '../../common/Butttons/Buttons'
import { Typography, Link } from '../../common/Typography/Typography'
import { Background } from '../../common/Layouts/Layouts'
import { theme } from '../../../theme'
import { FormField, Spacing, Rows } from '../../common/Widgets/Widgets'
import { RegistrationStageProps } from './RegistrationContainer'
import { SafeAreaView } from 'react-navigation'

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
      <RegistrationPrompt>Are you a Momentum delegate?</RegistrationPrompt>

      <RegistrationActions>
        <Button
          style={styles.button}
          onPress={() => props.onSubmit({ isConferenceDelegate: true })}
        >
          Yes
        </Button>
        <Button
          style={styles.button}
          onPress={() => props.onSubmit({ isConferenceDelegate: false })}
        >
          No
        </Button>
      </RegistrationActions>

      <RegistrationHelpText>
        We'll only send you delegate information if you say yes.
      </RegistrationHelpText>
    </RegistrationPanel>
  )
}

export function AcceptNotificationsPanel(props: RegistrationStageProps) {
  return (
    <RegistrationPanel>
      <RegistrationPrompt>
        Do you want to receive mobile notifications about event updates and
        conference news?
      </RegistrationPrompt>

      <RegistrationActions>
        <Button
          style={styles.button}
          onPress={() => props.onSubmit({ optedIntoNotifications: false })}
        >
          No Thanks
        </Button>
        <Button
          style={styles.button}
          onPress={() => props.onSubmit({ optedIntoNotifications: true })}
        >
          Yes Please!
        </Button>
      </RegistrationActions>

      <RegistrationHelpText>
        We’ll only be able to send you updates about events if you answer ‘Yes’
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
          <RegistrationPrompt>May we have your email?</RegistrationPrompt>

          <RegistrationActions>
            <FormField name="email" type="email" placeholder="Email address" />
          </RegistrationActions>

          <RegistrationActions>
            <Button style={styles.button} onPress={props.onSkip}>
              Skip this time
            </Button>
            <Button
              disabled={!isValid}
              style={styles.button}
              onPress={handleSubmit}
            >
              Sure, let's go!
            </Button>
          </RegistrationActions>

          <RegistrationHelpText>
            We'll use this to respond to feedback you give about the conference.
          </RegistrationHelpText>
        </RegistrationPanel>
      )}
    />
  )
}

export function RegistrationBg({ children }: React.Props<{}>) {
  return (
    <View style={styles.bg}>
      {children}

      <SafeAreaView style={styles.privacy}>
        <Typography variant="body" darkBg center>
          By using this app you agree to our{' '}
          <Link href="https://peoplesmomentum.com/privacy-policy/">
            Privacy Policy
          </Link>
        </Typography>
      </SafeAreaView>
    </View>
  )
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
  return <Typography variant="body">{children}</Typography>
}

function RegistrationActions({ children }: React.Props<{}>) {
  return <View style={styles.actions}>{children}</View>
}
