/**
 * Starts the web node in production mode
 */

require('ts-node').register({
  transpileOnly: true,
})
require('backend/config/environment')

const throng = require('throng')
const { configureWeb } = require('backend/config/web')
const { configurePubsub } = require('backend/config/pubsub')

const separateWorkerDynos = JSON.parse(
  process.env.SEPARATE_WORKER_DYNOS || 'false',
)

const concurrency = Number(process.env.WEB_CONCURRENCY || 1)

throng(concurrency, () => {
  configurePubsub({ subscribeWorkers: !separateWorkerDynos }).then(() =>
    configureWeb({ serveUI: true }),
  )
})
