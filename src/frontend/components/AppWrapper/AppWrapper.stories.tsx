import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { storyWrapper } from '../../config/storyWrapper';
import { AppWrapper } from './AppWrapper';
import { MemoryRouter } from 'react-router';
import { someAuthTokenPayload } from '../../../test/testUtils';

storiesOf('Components > AppWrapper', module)
  .add("Logged out", () =>
    storyWrapper({ user: undefined },
      <AppWrapper />
    )
  )
  .add("Logged in", () =>
    storyWrapper({ user: someAuthTokenPayload() },
      <AppWrapper />
    )
  )
