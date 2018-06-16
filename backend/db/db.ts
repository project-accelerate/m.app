import knex from "knex"
import { join } from "path";

export const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: join(__dirname, 'migrations'),
  },
})
