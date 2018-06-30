import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import somePhoto from 'common/test/somePhoto.jpg'
import { ImageWell } from './ImageWell'
import { storyWrapper } from 'frontend.web/storybook/storyWrapper'

storiesOf('ImageWell', module)
  .addDecorator(storyWrapper({ width: 320, height: 240 }))
  .add('Empty', () => (
    <ImageWell value={undefined} onChange={action('chagne')} />
  ))
  .add('With image url', () => (
    <ImageWell value={somePhoto} onChange={action('change')} />
  ))
