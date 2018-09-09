import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import * as Yup from 'yup'

import { Formik } from 'formik'

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

export function SubmitMeetupPersonalDetailsPanel(props: any) {
  return (
    <Formik
      onSubmit={(value: any) => {
        props.onSubmit({
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          telephoneNumber: value.telephoneNumber,
        })
      }}
      style={styles.container}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        telephoneNumber: '',
      }}
      render={({ handleSubmit, isValid }: FormikProps<{}>) => (
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
          <FormField name="firstName" type="text" textContentType="givenName" />

          <Spacing level={2} />

          <Typography>Last Name</Typography>
          <FormField name="lastName" type="text" textContentType="familyName" />

          <Spacing level={2} />

          <Typography>Email</Typography>
          <FormField
            keyboardType="email-address"
            name="email"
            textContentType="emailAddress"
            type="email"
          />

          <Spacing level={2} />

          <Typography>Your telephone number</Typography>
          <FormField
            name="telephoneNumber"
            type="number"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
          />

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
