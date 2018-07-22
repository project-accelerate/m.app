import React from 'react'
import {
  RegistrationIsDelegateQuestion,
  RegistrationBg,
} from './RegistrationPanels'

export const stories = {
  RegisterConferencePanel: () => (
    <RegistrationBg>
      <RegistrationIsDelegateQuestion onSubmit={console.log} />
    </RegistrationBg>
  ),
}
