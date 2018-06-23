import * as Knex from 'knex'
import { uuidPrimaryKey, uuidForeignKey } from '../migrationUtils'

export async function up(knex: Knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS postgis')

  await knex.schema.createTable('organiser', table => {
    uuidPrimaryKey(table)

    table.text('name').notNullable()
    table.text('photo')
    table.text('bio')
  })

  await knex.schema.createTable('venue', table => {
    uuidPrimaryKey(table)

    table.text('name')
    table.text('postcode').notNullable()
  })

  await knex.schema.createTable('event', table => {
    uuidPrimaryKey(table)
    uuidForeignKey(table, { references: 'organiser' }).notNullable()
    uuidForeignKey(table, { references: 'venue' }).notNullable()

    table.text('name')
    table.dateTime('startTime').notNullable()
    table.dateTime('endTime').notNullable()
    table.text('introduction').notNullable()
    table.specificType('location', 'geography').notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('event')
  await knex.schema.dropTable('organiser')
  await knex.schema.dropTable('venue')
}
