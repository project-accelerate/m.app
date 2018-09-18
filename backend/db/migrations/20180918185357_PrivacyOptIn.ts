import * as Knex from 'knex'

export async function up(db: Knex) {
  await db.schema.table('User', user => {
    user
      .boolean('consentToContact')
      .notNullable()
      .defaultTo(false)
  })
}

export async function down() {}
