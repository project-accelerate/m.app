import React from 'react'
import faker from 'faker'
import { Home } from './Home'
import { createLogger } from '../../common/logger'

export const stories = {
  HomeScreen: () => (
    <Home
      events={[]}
      news={[
        {
          id: faker.random.uuid(),
          timeSent: faker.date.future().toISOString(),
          title: faker.lorem.sentence(3),
          detail: faker.lorem.paragraphs(10),
        },
      ]}
      time={new Date()}
      onEventPress={createLogger('event')}
      onNewsPress={createLogger('news')}
    />
  ),
}
