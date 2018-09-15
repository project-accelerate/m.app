import * as Knex from 'knex'

export async function up(db: Knex) {
  await db.raw(`
    ALTER TABLE venue ALTER COLUMN photo DROP NOT NULL
  `)
}

export async function down() {}
