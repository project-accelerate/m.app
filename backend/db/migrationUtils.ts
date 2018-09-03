import * as Knex from 'knex'
import { CreateTableBuilder } from 'knex'

export function uuidPrimaryKey(table: CreateTableBuilder) {
  table
    .uuid('id')
    .primary()
    .notNullable()
}

interface UUIDForeignKeyRefOpts {
  name?: string
  referencedColumn?: string
  references: string
}

export function uuidForeignKey(
  table: CreateTableBuilder,
  {
    references,
    name = references,
    referencedColumn = 'id',
  }: UUIDForeignKeyRefOpts,
) {
  return table
    .uuid(name)
    .references(referencedColumn)
    .inTable(references)
}

interface OneToManyRelation {
  name: string
  fromTable: string
  toTable: string
  fromRef?: string
  toRef?: string
}

export function createOneToManyRelation(
  knex: Knex,
  {
    name,
    fromTable,
    toTable,
    fromRef = fromTable,
    toRef = toTable,
  }: OneToManyRelation,
) {
  return knex.schema.createTable(name, table => {
    table
      .uuid(fromRef)
      .notNullable()
      .references('id')
      .inTable(fromTable)
      .index()

    table
      .uuid(toRef)
      .notNullable()
      .references('id')
      .inTable(toTable)
      .index()
  })
}

export function dropTableForRollback(db: Knex, name: string) {
  return db.raw(`drop table if exists "${name}" cascade`)
}
