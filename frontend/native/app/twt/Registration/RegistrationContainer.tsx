import React from 'react'

import {
  RegistrationIsDelegateQuestion,
  AcceptNotificationsPanel,
  RegistrationAskEmailPanel,
  RegistrationBg,
} from './RegistrationPanels'

import { registration } from './registrationState'
import { createStateConnector } from '../../../state'
import { createWizard, WizardStageProps } from '../../common/Wizard/Wizard'

interface RegistrationWizardData {
  isConferenceDelegate: boolean
  optedIntoNotifications: boolean
  email: string
}

export type RegistrationStageProps = WizardStageProps<RegistrationWizardData>

const Connect = createStateConnector(() => ({
  registration: registration.selectors.optionalRegistration,
}))

const RegistrationWizard = createWizard<RegistrationWizardData>({
  stages: [
    AcceptNotificationsPanel,
    RegistrationIsDelegateQuestion,
    RegistrationAskEmailPanel,
  ],
})

export function RegistrationContainer(props: React.Props<{}>) {
  return (
    <Connect>
      {({ registration, actions }) => {
        if (registration) {
          return props.children || null
        }

        return (
          <RegistrationBg>
            <RegistrationWizard
              initialState={{
                email: '',
                isConferenceDelegate: false,
                optedIntoNotifications: false,
              }}
              darkBg
              onCompleted={actions.registration.register}
            />
          </RegistrationBg>
        )
      }}
    </Connect>
  )
}
