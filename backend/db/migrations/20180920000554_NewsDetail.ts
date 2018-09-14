import * as Knex from 'knex'

export async function up(db: Knex) {
  await db.schema.table('ConferenceNotification', table => {
    table.text('detail')
  })
}

export async function down() {}
