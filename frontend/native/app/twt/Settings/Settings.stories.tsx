import React from 'react'
import { Settings } from './Settings'

export const stories = {
  OptedIn: () => <Settings consentToContact onOptOut={() => {}} />,
  OptedOut: () => <Settings consentToContact={false} onOptOut={() => {}} />,
}
