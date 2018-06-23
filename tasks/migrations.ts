import { db } from '../backend/db/db'

export async function makeMigration(name: string = 'New-Migration') {
  await db.migrate.make(name, {
    extension: 'ts',
  })
}
