/**
 * Starts the web node in production mode
 */

import './config/environment'
import { configureWeb } from './config/web'

configureWeb({ serveUI: true })
