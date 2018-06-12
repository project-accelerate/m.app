/**
 * Starts the web node in production mode
 */

import "../config/node"
import log from "winston"
import { configureWeb } from "../config/web";

configureWeb({ serveUI: true })
