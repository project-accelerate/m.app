import React from 'react'
import { storiesOf } from '@storybook/react'
import { FieldState } from 'formstate'
import somePhoto from 'common/test/somePhoto.jpg'
import { ImageWell, ImageWellValue } from './ImageWell'
import { storyWrapper } from 'frontend.web/storybook/storyWrapper'

storiesOf('ImageWell', module)
  .addDecorator(storyWrapper({ width: 320, height: 240 }))
  .add('Empty', () => (
    <ImageWell image={new FieldState<ImageWellValue>(undefined)} />
  ))
  .add('With image url', () => (
    <ImageWell image={new FieldState<ImageWellValue>(somePhoto)} />
  ))
