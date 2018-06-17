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
