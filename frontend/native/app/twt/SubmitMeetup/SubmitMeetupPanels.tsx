import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import * as Yup from 'yup'

import { Formik, FormikProps, FormikErrors } from 'formik'

import { theme } from '../../../theme'

import { Button } from '../../common/Butttons/Buttons'
import { FormField, Spacing } from '../../common/Widgets/Widgets'
import { Typography, Paragraphs } from '../../common/Typography/Typography'

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.level(2),
  },
  button: {
    flex: 1,
    margin: theme.spacing.level(1),
  },
  container: {
    margin: theme.spacing.level(2),
  },
  formError: {
    color: theme.pallete.errorColor,
  },
  heading: {
    color: theme.pallete.header,
    width: '100%',
    marginTop: theme.spacing.level(2),
  },
  introductionText: {
    width: '100%',
    marginTop: theme.spacing.level(2),
  },
})

export function SubmitMeetupInstructionsPanel(props: any) {
  return (
    <SubmitMeetupPanel>
      <SubmitMeetupHeading>Host A Meetup</SubmitMeetupHeading>

      <SubmitMeetupPanelIntroduction>
        <Typography>
          Meetups are great ways to get to know people from around the movement.
          It takes about ten minutes to set one up.
        </Typography>

        <Typography>
          Once submitted it will be vetted by our anti-troll experts and added
          to our list of events for you to hang out at.
        </Typography>

        <Typography>Stay safe and have fun!</Typography>
      </SubmitMeetupPanelIntroduction>

      <SubmitMeetupActions>
        <Button variant="small" onPress={() => props.onSubmit()}>
          Let's Go
        </Button>
      </SubmitMeetupActions>
    </SubmitMeetupPanel>
  )
}

interface SubmitMeetupPersonalDetailsValues {
  firstName: string
  lastName: string
  email: string
  telephoneNumber: string
}

export function SubmitMeetupPersonalDetailsPanel(props: any) {
  return (
    <Formik
      onSubmit={(values: SubmitMeetupPersonalDetailsValues) => {
        props.onSubmit({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          telephoneNumber: values.telephoneNumber,
        })
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string()
          .trim()
          .required('Your first name is required'),
        lastName: Yup.string()
          .trim()
          .required('Your last name is required'),
        email: Yup.string()
          .trim()
          .email(
            "That doesn't look like a valid email address - emails typically take the format someone@example.com",
          )
          .required(
            'Email is required. We need this to contact you about the meetup and tell you when the meetup is approved',
          ),
        // TODO: This isn't genuinely enough to validate a telephone number
        telephoneNumber: Yup.number()
          .typeError(
            "That doesn't look like a valid phone number, can you try again?",
          )
          .min(
            7,
            "That doesn't look like a valid phone number, it's too short, can you try again?",
          )
          .required(
            'A telephone number is required. We need this to contact you about the meetup and tell you when the meetup is approved',
          ),
      })}
      style={styles.container}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        telephoneNumber: '',
      }}
      render={({
        handleSubmit,
        isValid,
        errors,
        touched,
      }: FormikProps<SubmitMeetupPersonalDetailsValues>) => (
        <SubmitMeetupPanel>
          <SubmitMeetupHeading>Your Details</SubmitMeetupHeading>

          <Paragraphs>
            <Typography>
              We need a few details to verify you and your meetup.
            </Typography>

            <Typography>
              These won't be displayed publicly but will help out our moderation
              team.
            </Typography>

            <Typography>
              Moderation usually takes under an hour. Your meetup will then be
              displayed on the event calendar for people to come along to.
            </Typography>
          </Paragraphs>

          <Typography>First Name</Typography>
          <FormField
            autoCorrect={false}
            name="firstName"
            textContentType="givenName"
            type="text"
          />
          <SubmitMeetupFormError>
            {touched.firstName && errors.firstName && errors.firstName}
          </SubmitMeetupFormError>

          <Spacing level={2} />

          <Typography>Last Name</Typography>
          <FormField
            autoCorrect={false}
            name="lastName"
            textContentType="familyName"
            type="text"
          />
          <SubmitMeetupFormError>
            {touched.lastName && errors.lastName && errors.lastName}
          </SubmitMeetupFormError>

          <Spacing level={2} />

          <Typography>Email</Typography>
          <FormField
            autoCorrect={false}
            keyboardType="email-address"
            name="email"
            textContentType="emailAddress"
            type="email"
          />
          <SubmitMeetupFormError>
            {touched.email && errors.email && errors.email}
          </SubmitMeetupFormError>

          <Spacing level={2} />

          <Typography>Your telephone number</Typography>
          <FormField
            keyboardType="phone-pad"
            name="telephoneNumber"
            textContentType="telephoneNumber"
            type="number"
          />
          <SubmitMeetupFormError>
            {touched.telephoneNumber &&
              errors.telephoneNumber &&
              errors.telephoneNumber}
          </SubmitMeetupFormError>

          <SubmitMeetupActions>
            <Button variant="small" onPress={handleSubmit} disabled={!isValid}>
              Next
            </Button>
          </SubmitMeetupActions>
        </SubmitMeetupPanel>
      )}
    />
  )
}

export function SubmitMeetupMeetupDetailsPanel(props: any) {
  return (
    <Formik>
      <SubmitMeetupPanel>
        <SubmitMeetupHeading>Meetup Details</SubmitMeetupHeading>

        <Paragraphs>
          <Typography>Now enter the details of your meetup.</Typography>

          <Typography>
            These details will be displayed publicly so people can find you.
          </Typography>
        </Paragraphs>

        <Typography>Name Of Event</Typography>
        <FormField name="email" type="text" placeholder="John" />

        <Spacing level={2} />

        <Typography>Who Is Hosting The Event?</Typography>
        <FormField name="email" type="text" placeholder="McDonnell" />

        <Typography>
          If the event is being hosted by a specific group, for example, XYZ
          Momentum then you can add it here. Otherwise it will be listed as
          being hosted by your name.
        </Typography>
        <Spacing level={2} />

        <Typography>Event Description</Typography>
        <Typography>What is your event about?</Typography>
        <FormField name="email" type="text" placeholder="McDonnell" />

        <Typography>Start Time</Typography>
        <FormField name="email" type="text" placeholder="McDonnell" />

        <Typography>End Time</Typography>
        <FormField name="email" type="text" placeholder="McDonnell" />

        <Typography>Location</Typography>
        <FormField name="email" type="text" placeholder="McDonnell" />

        <SubmitMeetupActions>
          <Button variant="small" onPress={() => props.onSubmit()}>
            Next
          </Button>
        </SubmitMeetupActions>
      </SubmitMeetupPanel>
    </Formik>
  )
}

export function SubmitMeetupThanksPanel(props: any) {
  return (
    <SubmitMeetupPanel>
      <SubmitMeetupHeading>Thanks!</SubmitMeetupHeading>

      <SubmitMeetupPanelIntroduction>
        <Typography>Thanks so much for adding a meetup!</Typography>

        <Typography>
          Moderation usually takes under an hour and we will send you an email
          to someone@example.com when its done.
        </Typography>

        <Typography>
          Your meetup will be displayed on the event calendar for people to come
          along to.
        </Typography>
      </SubmitMeetupPanelIntroduction>

      <SubmitMeetupActions>
        <Button variant="small" onPress={() => props.onSubmit()}>
          Great!
        </Button>
      </SubmitMeetupActions>
    </SubmitMeetupPanel>
  )
}

function SubmitMeetupHeading({ children }: React.Props<{}>) {
  return (
    <Typography variant="display" style={styles.heading}>
      {children}
    </Typography>
  )
}

function SubmitMeetupPanelIntroduction({ children }: React.Props<{}>) {
  return <Paragraphs style={styles.introductionText}>{children}</Paragraphs>
}

function SubmitMeetupPanel({ children }: React.Props<{}>) {
  return <ScrollView style={styles.container}>{children}</ScrollView>
}

function SubmitMeetupActions({ children }: React.Props<{}>) {
  return <View style={styles.actions}>{children}</View>
}

function SubmitMeetupFormError({ children }: React.Props<{}>) {
  return <Typography style={styles.formError}>{children}</Typography>
}
