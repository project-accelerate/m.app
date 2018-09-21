import React from 'react'
import { Toolbar, ToolbarRadio, Rows } from './Widgets'
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
  Buttons: () => (
    <Rows>
      <Button icon="twitter">Tweet</Button>
      <Button>Tweet</Button>
      <Button variant="inline">Tweet</Button>
      <Button disabled>Disabled</Button>
    </Rows>
  ),
}
