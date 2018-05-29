import 'reflect-metadata'
import * as log from 'winston'
import { db } from "../db";

beforeAll(async () => {
  while (true) {
    try {
      log.debug('Waiting for database to come online...')
      await db.raw('select 1')
      break

    } catch {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
  
  try {
    await db.migrate.latest()
  } catch (error) {
    log.error(error.message)
    process.exit(1)
  }
})
