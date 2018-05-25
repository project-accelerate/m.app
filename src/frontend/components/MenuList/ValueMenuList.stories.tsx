import * as React from 'react'
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { storyWrapper } from '../../config/storyWrapper';
import { ValueMenuList } from './ValueMenuList';

storiesOf('ValueMenuList', module)
  .addDecorator(storyWrapper())
  .add('With selection', () =>
    <ValueMenuList
      options={[1, 2, 3, 4]}
      onChange={action('change')}
      value={1}
    />
  )
  .add('With formatter', () =>
    <ValueMenuList
      options={["a", "b", "c"]}
      onChange={action('change')}
      value="a"
      format={x => x.toUpperCase()}
    />
  )
