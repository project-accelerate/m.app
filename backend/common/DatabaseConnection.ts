import { Service } from 'typedi'
import Knex from 'knex'
import KnexGis from 'knex-postgis'
import { join } from 'path'

@Service()
export class DatabaseConnection {
  knex = Knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: join(__dirname, '..', 'db', 'migrations'),
      extension: 'ts',
    },
  })

  get gis() {
    return KnexGis(this.knex)
  }
}
