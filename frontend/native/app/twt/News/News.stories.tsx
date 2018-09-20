import * as React from 'react'
import faker from 'faker'
import { NewsPanel } from './NewsPanel'
import { Rows } from '../../common/Widgets/Widgets'
import { NewsDetail } from './NewsDetail'

export const stories = {
  detail: () => (
    <NewsDetail
      item={{
        id: faker.random.uuid(),
        timeSent: faker.date.future().toISOString(),
        title: faker.lorem.sentence(3),
        message: faker.lorem.sentences(3),
        detail: faker.lorem.paragraphs(4),
      }}
    />
  ),
  list: () => (
    <Rows>
      <NewsPanel
        onPress={console.log}
        news={{
          id: faker.random.uuid(),
          timeSent: faker.date.future().toISOString(),
          title: faker.lorem.sentence(3),
          message: faker.lorem.sentences(3),
        }}
      />
      <NewsPanel
        onPress={console.log}
        news={{
          id: faker.random.uuid(),
          timeSent: faker.date.future().toISOString(),
          title: faker.lorem.sentence(3),
          message: faker.lorem.sentences(3),
        }}
      />
      <NewsPanel
        onPress={console.log}
        news={{
          id: faker.random.uuid(),
          timeSent: faker.date.future().toISOString(),
          title: faker.lorem.sentence(3),
          message: faker.lorem.sentences(3),
        }}
      />
    </Rows>
  ),
}
