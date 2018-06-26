import React from 'react'
import { storiesOf } from '@storybook/react'
import { FloatingActionButton } from 'frontend.web/app/common/Widgets/Widgets'
import { storyWrapper } from 'frontend.web/storybook/storyWrapper'

storiesOf('Widgets', module)
  .addDecorator(storyWrapper({ width: 320, height: 240, bg: 'steelblue' }))
  .add('FloatingActionButton', () => <FloatingActionButton />)
