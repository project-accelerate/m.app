import React, { useState, useEffect } from 'react'

import {
  RegistrationIsDelegateQuestion,
  AcceptNotificationsPanel,
  RegistrationAskEmailPanel,
  RegistrationBg,
} from './RegistrationPanels'
import * as registration from './registrationState'
import { createStateConnector } from '../../../state'
import { createWizard, WizardStageProps } from '../../common/Wizard/Wizard'
import { compact } from 'lodash'
import { Platform, AsyncStorage } from 'react-native'
import { prefetchHomeData } from '../Home/prefetchHomeData'
import { checkUserExists } from '../../../config/auth'
import { ReactNode } from 'react'

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
  stages: compact([
    Platform.OS === 'ios' && AcceptNotificationsPanel,
    RegistrationIsDelegateQuestion,
    RegistrationAskEmailPanel,
  ]),
})

const RegistrationGuard = (props: {
  data?: registration.State,
  children: ReactNode,
  onCompleted: (params: RegistrationWizardData) => Promise<void>
}) => {
  const [userValidatedExists, setUserValidatedExists] = useState<boolean | undefined>(undefined)
  useEffect(() => {
    if (props.data) {
      checkUserExists(props.data.userId).then(exists => {
        if (exists) {
          setUserValidatedExists(true)
        } else {
          AsyncStorage.clear()
          setUserValidatedExists(false)
        }
      })
    } else {
      setUserValidatedExists(false)
    }
  }, [setUserValidatedExists, props.data])

  if (typeof userValidatedExists === 'undefined') {
    return null
  }
  
  if (!userValidatedExists || !props.data) {
    return (
      <RegistrationBg>
        <RegistrationWizard
          initialState={{
            email: '',
            isConferenceDelegate: false,
            optedIntoNotifications: true,
          }}
          darkBg
          onCompleted={async params => {
            await props.onCompleted(params)
            await prefetchHomeData({})
          }}
        />
      </RegistrationBg>
    )
  }

  return <>{props.children}</>
}

export function RegistrationContainer(props: React.Props<{}>) {
  return (
    <Connect>
      {({ registration, actions }) => (
          <RegistrationGuard data={registration || undefined} onCompleted={actions.registration.register}>
            {props.children || null}
          </RegistrationGuard>
        )
      }
    </Connect>
  )
}
