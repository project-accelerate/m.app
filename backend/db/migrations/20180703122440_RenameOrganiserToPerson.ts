import * as Knex from 'knex'
import { uuidPrimaryKey, uuidForeignKey } from '../migrationUtils'

export async function up(knex: Knex) {
  await knex.schema.alterTable('event', table => {
    table.dropColumn('organiser')
  })

  await knex.schema.createTable('person', table => {
    uuidPrimaryKey(table)
    table.text('name').notNullable()
    table.text('bio')
    table.text('photo')
  })

  await knex.raw('insert into person select * from organiser;')
  await knex.raw('drop table organiser cascade;')

  await knex.schema.alterTable('event', table => {
    table.string('family').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('organiser')
  await knex.schema.renameTable('person', 'organiser')

  await knex.schema.alterTable('event', table => {
    uuidForeignKey(table, { references: 'organiser' }).notNullable()
  })
}
