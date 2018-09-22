import * as Knex from 'knex'

export async function up(db: Knex) {
  await db.schema.alterTable('event', table => {
    table.boolean('cancelled')
  })
}

export async function down() {}
