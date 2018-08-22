import './config/environment'
import { runScheduledTasks } from './util/ScheduledTask'
import { configurePubsub } from './config/pubsub'

const type = process.argv[2]
if (!type) {
  throw Error(`No task type provided`)
}

configurePubsub({ subscribeWorkers: false }).then(() =>
  runScheduledTasks({
    searchPath: './app/*/application/*.ts?(x)',
    type: type,
  }),
)
