import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { theme } from '../../../theme'
import { Typography, Paragraphs } from '../../common/Typography/Typography'

const style = StyleSheet.create({
  heading: {
    color: theme.pallete.header,
    width: '100%',
    padding: theme.spacing.level(1),
    marginTop: theme.spacing.level(2),
  },
  introductionText: {
    width: '100%',
    padding: theme.spacing.level(1),
    marginTop: theme.spacing.level(2),
  },
})

export function SubmitMeetupInstructionsPanel() {
  return (
    <ScrollView>
      <Typography variant="display" style={style.heading}>
        Host A Meetup
      </Typography>

      <Paragraphs style={style.introductionText}>
        <Typography>
          Meetups are great ways to get to know people from around the movement.
          If you want to start a meetup then submit the form below.
        </Typography>

        <Typography>
          Once submitted it will be vetted by our anti-troll experts and added
          to our list of events for you to hang out at.
        </Typography>

        <Typography>Stay safe and have fun!</Typography>
      </Paragraphs>
    </ScrollView>
  )
}

export function SubmitMeetupPersonalDetailsPanel() {
  return (
    <ScrollView>
      <Typography>Personal details</Typography>
    </ScrollView>
  )
}

export function SubmitMeetupMeetupDetailsPanel() {
  return (
    <ScrollView>
      <Typography>Meetup Details</Typography>
    </ScrollView>
  )
}

export function SubmitMeetupThanksPanel() {
  return (
    <ScrollView>
      <Typography>Thanks!</Typography>
    </ScrollView>
  )
}
