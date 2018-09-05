import React from 'react'
import {
  RegistrationIsDelegateQuestion,
  RegistrationBg,
  RegistrationAskEmailPanel,
} from './RegistrationPanels'

export const stories = {
  RegistrationIsDelegateQuestion: () => (
    <RegistrationBg>
      <RegistrationIsDelegateQuestion
        onSkip={console.log}
        onSubmit={console.log}
      />
    </RegistrationBg>
  ),
  RegistrationAskEmailPanel: () => (
    <RegistrationBg>
      <RegistrationAskEmailPanel onSkip={console.log} onSubmit={console.log} />
    </RegistrationBg>
  ),
}
