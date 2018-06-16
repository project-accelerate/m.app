import * as React from 'react'
import { storiesOf } from '@storybook/react';
import { storyWrapper } from '../../storybook/storyWrapper';
import { LocationPicker } from './LocationPicker';
import { Popover } from '@material-ui/core';

storiesOf('LocationPicker', module)
  .addDecorator(storyWrapper())
  .add('With postcode', () =>
    <Popover open>
      <LocationPicker value="BN1" onChange={() => {}} />
    </Popover>
  )
