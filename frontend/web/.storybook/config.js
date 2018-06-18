import * as React from 'react'
import { configure } from '@storybook/react'

function loadStories() {
  const storyContext = require.context('../', true, /\.stories\.tsx$/)
  storyContext.keys().forEach(storyContext)
}

configure(loadStories, module)
