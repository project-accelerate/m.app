import * as Knex from 'knex'
import { uuidPrimaryKey } from 'backend/db/migrationUtils'

export async function up(db: Knex) {
  await db.schema.createTable('PendingNotification', table => {
    uuidPrimaryKey(table)
    table
      .dateTime('timeSent')
      .notNullable()
      .index()
    table.string('ticketId').notNullable()
    table
      .uuid('deviceId')
      .notNullable()
      .index()
  })
}

export async function down(db: Knex) {
  db.schema.dropTable('PendingNotification')
}
