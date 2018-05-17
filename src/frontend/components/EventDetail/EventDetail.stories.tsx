import * as React from 'react'
import * as faker from 'faker'
import { storiesOf } from '@storybook/react'
import { EventDetail } from './EventDetail';

import { storyWrapper } from '../../config/storyWrapper';

storiesOf("Components > EventDetail", module)
  .addDecorator(storyWrapper())
  .add("Initial State", () =>
    <EventDetail
      id={faker.random.uuid()}
      name={faker.lorem.words(3)}
    />
  )
