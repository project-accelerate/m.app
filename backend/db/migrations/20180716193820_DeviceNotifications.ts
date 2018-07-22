import * as Knex from 'knex'
import { uuidPrimaryKey, uuidForeignKey } from 'backend/db/migrationUtils'

export async function up(db: Knex) {
  await db.schema.createTable('User', table => {
    uuidPrimaryKey(table)

    table.string('email')
    table.boolean('optedIntoNotifications').notNullable()
  })

  await db.schema.createTable('Device', table => {
    uuidPrimaryKey(table)

    table.string('deviceToken').index()
    table.string('deviceType').index()

    uuidForeignKey(table, {
      references: 'User',
      name: 'owner',
    })
  })

  await db.schema.createTable('ConferenceAttendance', table => {
    uuidPrimaryKey(table)
    table.string('conference').notNullable()

    uuidForeignKey(table, {
      references: 'User',
      name: 'attendee',
    })
  })
}

export async function down(db: Knex) {
  db.schema.dropTable('ConferenceAttendance')
  db.schema.dropTable('Device')
  db.schema.dropTable('User')
}
