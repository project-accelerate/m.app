import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps,
} from 'react-navigation'

import { Background } from '../../common/Layouts/Layouts'
import { BasicScreen } from '../../common/Screen/BasicScreen'
import { createWizard, WizardStageProps } from '../../common/Wizard/Wizard'

import {
  SubmitMeetupInstructionsPanel,
  SubmitMeetupPersonalDetailsPanel,
  SubmitMeetupMeetupDetailsPanel,
  SubmitMeetupLocationPanel,
  SubmitMeetupThanksPanel,
  SubmitMeetupPersonalDetailsValues,
  SubmitMeetupMeetupDetailsPanelValues,
} from './SubmitMeetupPanels'

type SubmitMeetupWizardData = SubmitMeetupPersonalDetailsValues &
  SubmitMeetupMeetupDetailsPanelValues

export type SubmitMeetupStageProps = WizardStageProps<SubmitMeetupWizardData>

// @ts-ignore TS2345
// TODO: SubmitMeetupMeetupDetailsPanel has a incompatiable type
const SubmitMeetupWizard = createWizard<SubmitMeetupWizardData>({
  stages: [
    SubmitMeetupInstructionsPanel,
    SubmitMeetupLocationPanel,
    SubmitMeetupMeetupDetailsPanel,
    SubmitMeetupPersonalDetailsPanel,
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
