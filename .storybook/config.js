import { configure } from '@storybook/react';

function loadStories() {
  const storyContext = require.context('../src/frontend', true, /\.stories\.tsx/)
  loadAllFromContext(storyContext)
}

function loadAllFromContext(requireContext) {
  requireContext.keys().forEach(requireContext)
}

configure(loadStories, module);
