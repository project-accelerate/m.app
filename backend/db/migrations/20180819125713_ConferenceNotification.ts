import * as Knex from 'knex'
import { uuidPrimaryKey, dropTableForRollback } from 'backend/db/migrationUtils'

export async function up(db: Knex) {
  await db.schema.createTable('ConferenceNotification', table => {
    uuidPrimaryKey(table)
    table
      .dateTime('timeSent')
      .notNullable()
      .index()
    table.string('title').notNullable()
    table.string('message').notNullable()
    table.boolean('urgent').notNullable()
    table.string('link')
    table.string('associatedEventId')
    table.string('scope').notNullable()
  })
}

export async function down(db: Knex) {
  await dropTableForRollback(db, 'ConferenceNotification')
}
