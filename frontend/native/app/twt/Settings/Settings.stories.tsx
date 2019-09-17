import React from 'react'
import * as settings from './Settings'

export const stories = {
  OptedIn: () => <Settings consentToContact onOptOut={() => {}} />,
  OptedOut: () => <Settings consentToContact={false} onOptOut={() => {}} />,
}
