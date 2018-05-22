import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { storyWrapper } from '../../config/storyWrapper';
import { AppWrapper } from './AppWrapper';
import { MemoryRouter } from 'react-router';

storiesOf('Components > AppWrapper', module)
  .addDecorator(storyWrapper())
  .add("Initial state", () =>
    <MemoryRouter>
      <AppWrapper>
        This is a page with some content
      </AppWrapper>
    </MemoryRouter>
  )