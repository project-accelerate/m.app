import 'reflect-metadata'
import * as log from 'winston'
import { db } from '../db/db';

export async function configureDb() {
  while (true) {
    try {
      log.debug('Waiting for database to come online...')
      await db.raw('select 1')
      break

    } catch {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  log.debug("Database is online. Performing migrations...")
  await db.migrate.latest()
}
