import React from 'react'
import { Home } from './Home'
import { createLogger } from '../../common/logger'

export const stories = {
  HomeScreen: () => (
    <Home events={[]} time={new Date()} onEventPress={createLogger('press')} />
  ),
}
