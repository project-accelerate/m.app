import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'

import { Background } from '../../common/Layouts/Layouts'
import { BasicScreen } from '../../common/Screen/BasicScreen'
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
    headerTitle: 'Host Meetup',
    title: 'Host Meetup',
    drawerLabel: 'Host Meetup',
  }

  render() {
    return (
      <BasicScreen>
        <Background solid style={{ flex: 1 }}>
          <SubmitMeetupWizard
            initialState={{
              email: '',
            }}
            onCompleted={() => console.log('Completed wizard')}
          />
        </Background>
      </BasicScreen>
    )
  }
}
