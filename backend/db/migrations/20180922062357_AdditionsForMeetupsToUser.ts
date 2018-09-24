import * as Knex from 'knex'

export async function up(db: Knex) {
  await db.schema.alterTable('User', table => {
    table.string('name')
    table.string('telephoneNumber')
  })
}

export async function down(db: Knex) {
  await db.raw(`
    ALTER TABLE User ALTER COLUMN name DROP
  `)

  await db.raw(`
    ALTER TABLE User ALTER COLUMN telephoneNumber DROP
  `)
}
