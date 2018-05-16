import { createConnection } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as log from 'winston'

export async function configureDb(opts: Partial<PostgresConnectionOptions> = {}) {
  log.info('Configuring db....')

  return createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: (process.env.NODE_ENV !== 'production'),
    logger: 'advanced-console',
    logging: 'all',
    entities: [
      `${__dirname}/../modules/*/domain/*.ts`
    ],
    ...opts
  })
}
