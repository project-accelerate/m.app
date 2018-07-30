import React from 'react'
import { Toolbar, ToolbarRadio } from './Widgets'

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
}
