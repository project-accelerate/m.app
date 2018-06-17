import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { someAuthTokenPayload } from 'common/test/testUtils'
import { storyWrapper } from '../../storybook/storyWrapper'
import { AppWrapper } from './AppWrapper'

storiesOf('Components > AppWrapper', module)
  .add('Logged out', () => storyWrapper({ user: undefined }, <AppWrapper />))
  .add('Logged in', () =>
    storyWrapper({ user: someAuthTokenPayload() }, <AppWrapper />),
  )
