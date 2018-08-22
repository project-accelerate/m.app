/**
 * Starts the web node in production mode
 */

import './config/environment'
import { configureWeb } from './config/web'
import { configurePubsub } from './config/pubsub'

const separateWorkerDynos = JSON.parse(
  process.env.SEPARATE_WORKER_DYNOS || 'false',
)

configurePubsub({ subscribeWorkers: !separateWorkerDynos }).then(() =>
  configureWeb({ serveUI: true }),
)
