import * as Knex from 'knex'
import {
  uuidPrimaryKey,
  uuidForeignKey,
  createOneToManyRelation,
} from '../migrationUtils'

export async function up(knex: Knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS postgis')

  await knex.schema.createTable('person', table => {
    uuidPrimaryKey(table)

    table.text('name').notNullable()
    table.text('photo')
    table.text('bio')
  })

  await knex.schema.createTable('venue', table => {
    uuidPrimaryKey(table)

    table.text('name').notNullable()
    table.text('description').notNullable()
    table.text('photo').notNullable()
    address(table)
  })

  await knex.schema.createTable('event', table => {
    uuidPrimaryKey(table)
    uuidForeignKey(table, { references: 'venue' }).notNullable()

    table.text('name').notNullable()
    table.string('family').notNullable()
    table.dateTime('startTime').notNullable()
    table.dateTime('endTime').notNullable()
    table.text('introduction').notNullable()
    table.text('detail').notNullable()
    table.text('photo')
    table.specificType('location', 'geography').notNullable()
  })

  await createOneToManyRelation(knex, {
    name: 'event_speakers',
    fromTable: 'event',
    toTable: 'person',
    toRef: 'speaker',
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('event')
  await knex.schema.dropTable('person')
  await knex.schema.dropTable('venue')
}

function address(table: Knex.CreateTableBuilder) {
  table.text('streetAddress').notNullable()
  table.text('city').notNullable()
  table.text('postcode').notNullable()
  table.specificType('location', 'geography').notNullable()
}
