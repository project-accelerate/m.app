import * as Knex from 'knex'
import { uuidPrimaryKey, uuidForeignKey } from 'backend/db/migrationUtils'

export async function up(db: Knex) {
  await db.schema.createTable('EventAttendance', table => {
    uuidPrimaryKey(table)

    uuidForeignKey(table, {
      name: 'event',
      references: 'event',
    })

    uuidForeignKey(table, {
      name: 'user',
      references: 'User',
    })
  })
}

export async function down(db: Knex) {
  db.schema.dropTable('EventAttendance')
}
