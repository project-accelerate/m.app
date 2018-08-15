/**
 * Starts the web node in development mode
 */

import './config/environment'
import { configureDb } from './config/db'
import { configureTestData } from './config/testData'
import { configureWeb } from './config/web'
import { configurePubsub } from 'backend/config/pubsub'

configureDb()
  .then(() => configureTestData())
  .then(() => configurePubsub())
  .then(() => configureWeb({ serveUI: false }))
