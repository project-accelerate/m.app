import * as Knex from 'knex'

export async function up(db: Knex) {
  await db.schema.alterTable('person', table => {
    table.string('twitterHandle')
  })
}

export async function down() {}
