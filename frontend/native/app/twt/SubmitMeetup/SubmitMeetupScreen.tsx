import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'

import { Background } from '../../common/Layouts/Layouts'
import { Paragraphs, Typography } from '../../common/Typography/Typography'
import { Screen } from '../../common/Widgets/Widgets'
import { createWizard } from '../../common/Wizard/Wizard'

import {
  SubmitMeetupInstructionsPanel,
  SubmitMeetupPersonalDetailsPanel,
  SubmitMeetupMeetupDetailsPanel,
  SubmitMeetupThanksPanel,
} from './SubmitMeetupPanels'

interface SubmitMeetupWizardData {
  email: string
}

const SubmitMeetupWizard = createWizard<SubmitMeetupWizardData>({
  stages: [
    SubmitMeetupInstructionsPanel,
    SubmitMeetupPersonalDetailsPanel,
    SubmitMeetupMeetupDetailsPanel,
    SubmitMeetupThanksPanel,
  ],
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
          <SubmitMeetupWizard
            initialState={{
              email: '',
            }}
            onCompleted={() => console.log('Completed wizard')}
          />
        </Background>
      </Screen>
    )
  }
}
