/**
 * Starts the web node in development mode
 */

import "./config/environment"
import { configureDb } from "./config/db";
import { configureTestData } from "./config/testData";
import { configureWeb } from "./config/web";

configureDb()
  .then(() => configureTestData())
  .then(() => configureWeb({ serveUI: false }))
