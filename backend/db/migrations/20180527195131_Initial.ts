import * as Knex from 'knex'
import {
  uuidPrimaryKey,
  uuidForeignKey,
  createOneToManyRelation,
  dropTableForRollback,
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
  await dropTableForRollback(knex, 'venue')
  await dropTableForRollback(knex, 'person')
  await dropTableForRollback(knex, 'event')
  await dropTableForRollback(knex, 'event_speakers')
}

function address(table: Knex.CreateTableBuilder) {
  table.text('streetAddress').notNullable()
  table.text('city').notNullable()
  table.text('postcode').notNullable()
  table.specificType('location', 'geography').notNullable()
}
