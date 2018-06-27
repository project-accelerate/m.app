import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  FloatingActionButton,
  MarkdownView,
} from 'frontend.web/app/common/Widgets/Widgets'
import { storyWrapper } from 'frontend.web/storybook/storyWrapper'

storiesOf('Widgets', module)
  .addDecorator(storyWrapper({ width: 320, height: 240, bg: 'lightgrey' }))
  .add('FloatingActionButton', () => <FloatingActionButton />)
  .add('MarkdownView', () => <MarkdownView value={markdownContent.trim()} />)

const markdownContent = `
# Header

ParagraphContent

Paragraph Content

* list
* items
* yay
`
