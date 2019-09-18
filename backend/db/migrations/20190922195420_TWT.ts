import * as Knex from 'knex'

export async function up(db: Knex) {
  await db.schema.alterTable('EventAttendance', table => {
    table.dropForeign(['event'])
  })
}

export async function down() {}
