import React from 'react'
import { Toolbar, ToolbarRadio } from './Widgets'
import { Button } from '../Butttons/Buttons'

export const stories = {
  'Toobar Radios': () => (
    <Toolbar>
      <ToolbarRadio active onPress={console.log}>
        Option 1
      </ToolbarRadio>
      <ToolbarRadio active onPress={console.log}>
        Option 2
      </ToolbarRadio>
    </Toolbar>
  ),
  'Icon Button': () => <Button icon="twitter">Tweet</Button>,
}
