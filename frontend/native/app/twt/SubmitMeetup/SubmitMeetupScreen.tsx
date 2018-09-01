import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'

import { Background } from '../../common/Layouts/Layouts'

import { Screen } from '../../common/Widgets/Widgets'
import { ScrollView, StyleSheet } from 'react-native'
import { Typography, Paragraphs } from '../../common/Typography/Typography'
import { theme } from '../../../theme'

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

export class SubmitMeetupScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions: NavigationScreenOptions = {
    headerTitle: 'Submit Meetup',
    title: 'Submit Meetup',
    drawerLabel: 'Submit Meetup',
  }

  render() {
    return (
      <Screen>
        <Background solid>
          <ScrollView>
            <Typography style={style.heading} variant="display">
              Host A Meetup
            </Typography>

            <Paragraphs style={style.introductionText}>
              <Typography>
                Meetups are great ways to get to know people from around the
                movement. If you want to start a meetup then submit the form
                below.
              </Typography>

              <Typography>
                Once submitted it will be vetted by our anti-troll experts and
                added to our list of events for you to hang out at.
              </Typography>

              <Typography>Stay safe and have fun!</Typography>
            </Paragraphs>
          </ScrollView>
        </Background>
      </Screen>
    )
  }
}
