import * as Knex from 'knex'

export async function up(db: Knex) {
  await db.schema.alterTable('person', table => {
    table.string('importRef').unique()
  })
  await db.schema.alterTable('venue', table => {
    table.string('importRef').unique()
  })
  await db.schema.alterTable('event', table => {
    table.string('importRef').unique()
  })
}

export async function down() {}
