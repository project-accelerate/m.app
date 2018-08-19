import * as Knex from 'knex'
import { uuidPrimaryKey } from 'backend/db/migrationUtils'

export async function up(db: Knex) {
  await db.schema.createTable('ConferenceNotification', table => {
    uuidPrimaryKey(table)
    table
      .dateTime('timeSent')
      .notNullable()
      .index()
    table.string('message').notNullable()
    table
      .string('scope')
      .notNullable()
      .index()
  })
}

export async function down(db: Knex) {
  db.schema.dropTable('ConferenceNotification')
}
