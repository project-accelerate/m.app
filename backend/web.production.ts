/**
 * Starts the web node in production mode
 */

import throng from 'throng'
import './config/environment'
import { configureWeb } from './config/web'
import { configurePubsub } from './config/pubsub'

const separateWorkerDynos = JSON.parse(
  process.env.SEPARATE_WORKER_DYNOS || 'false',
)

const concurrency = Number(process.env.WEB_CONCURRENCY || 1)

throng(concurrency, () => {
  configurePubsub({ subscribeWorkers: !separateWorkerDynos }).then(() =>
    configureWeb({ serveUI: true }),
  )
})
