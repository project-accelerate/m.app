/**
 * Starts the web node in production mode
 */

import './config/environment'
import { configureWeb } from './config/web'
import { configurePubsub } from './config/pubsub'

const { USES_WORKERS } = process.env

configurePubsub({ disable: USES_WORKERS === 'true' }).then(() =>
  configureWeb({ serveUI: true }),
)
