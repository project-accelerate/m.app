import React from 'react'
import {
  RegistrationIsDelegateQuestion,
  RegistrationBg,
  RegistrationAskEmailPanel,
  RegistrationAcceptTermsPanel,
} from './RegistrationPanels'

export const stories = {
  RegistrationIsDelegateQuestion: () => (
    <RegistrationBg>
      <RegistrationIsDelegateQuestion onSubmit={console.log} />
    </RegistrationBg>
  ),
  RegistrationAskEmailPanel: () => (
    <RegistrationBg>
      <RegistrationAskEmailPanel onSubmit={console.log} />
    </RegistrationBg>
  ),
}
