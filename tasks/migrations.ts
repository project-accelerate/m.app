import Knex from 'knex'
import { Container } from 'typedi'
import { DatabaseConnection } from 'backend/app/common/DatabaseConnection'

export async function makeMigration(name: string = 'New-Migration') {
  const db = Container.get(DatabaseConnection)

  await db.knex.migrate.make(name, {
    extension: 'ts',
  })
}
