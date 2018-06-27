import './config/environment'
import { configureDb } from './config/db'

configureDb().then(() => process.exit())
