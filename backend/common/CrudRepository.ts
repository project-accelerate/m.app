import uuid from 'uuid'
import { flatMap, mapValues } from 'lodash'
import Knex from 'knex'
import { WithoutId } from './WithoutId'
import { Inject, Service, Container } from 'typedi'
import { DatabaseConnection } from './DatabaseConnection'

export interface CrudRepository<T, Props> {
  /** Database object exposed for custom queries */
  db: DatabaseConnection

  /** Database table name */
  tableName: string

  /**
   * Custom select clauses defined in the fieldConfig. These should be used in
   * custom queries
   */
  customQueryFields: string[]

  /**
   * Encode an object for insertion into the database, using the fieldConverters
   * in the repository config
   */
  encode<K extends keyof Props>(value: Props): any

  /**
   * Decode an object returned from the database, using the fieldConverters
   * in the repository config
   */
  decode<K extends keyof T>(value: any): T

  /**
   * Decode objects returned from the database, using the fieldConverters
   * in the repository config
   */
  decodeAll<K extends keyof T>(value: any[]): T[]

  /**
   * Find an object by id
   */
  findOne(id: string): Promise<T | undefined>

  /**
   * Find an object by id
   */
  delete(id: string): Promise<void>

  /**
   * Find an object by id, throwing if not found
   */
  findOneRequired(id: string): Promise<T>

  /**
   * Return all instances
   */
  findAll(): Promise<T[]>

  /**
   * Insert an object into the database
   */
  insert(
    data: { [P in keyof Props]: Props[P] | Knex.QueryBuilder },
  ): Promise<string>

  /**
   * Update an object into the database
   */
  update(
    id: string,
    data: { [P in keyof Partial<Props>]: Props[P] | Knex.QueryBuilder },
  ): Promise<void>
}

export interface CrudRepositoryConfig<T> {
  tableName: string
  fieldConverters?: { [P in keyof Partial<T>]: FieldConverter<T[P]> }
}

export interface CrudRepositoryConstructor<T, Props> {
  tableName: string
  new (): CrudRepository<T, Props>
}

export interface FieldConverter<T> {
  from?: (x: T) => any
  to?: (x: any) => T
  query?: (column: string) => Knex.QueryBuilder
}

export function CrudRepository<T extends { id: string }, Props = WithoutId<T>>(
  opts: CrudRepositoryConfig<T>,
): CrudRepositoryConstructor<T, Props> {
  const { fieldConverters = {} as any, tableName } = opts

  class CrudRepositoryBase implements CrudRepository<T, Props> {
    static tableName = opts.tableName

    db = Container.get(DatabaseConnection)

    tableName = tableName

    customQueryFields = flatMap(
      fieldConverters,
      (field: FieldConverter<any>, key: string) =>
        field.query ? [field.query(key)] : [],
    ) as any

    encode(value: Partial<Props>): any {
      return mapValues(value, (field: any, key: string) => {
        const convert = fieldConverters[key] || {}
        return convert.from ? convert.from(field) : field
      })
    }

    decode(value: any): T
    decode(): undefined
    decode(value?: any): T | undefined {
      if (!value) {
        return undefined
      }

      return mapValues(value, (field: any, key: string) => {
        const convert = fieldConverters[key] || {}
        return convert.to ? convert.to(field) : field
      }) as any
    }

    decodeAll(value: any[]): T[] {
      return value.map(row => this.decode(row))
    }

    async findOne(id: string): Promise<T | undefined> {
      return await this.db.knex
        .select('*', ...this.customQueryFields)
        .first()
        .from(opts.tableName)
        .where('id', id)
        .then(x => this.decode(x))
    }

    async findOneRequired(id: string) {
      const item = await this.findOne(id)
      if (!item) {
        throw Error(`Not found: ${this.tableName}:${id}`)
      }

      return item
    }

    async findAll() {
      return await this.db.knex
        .select('*', ...this.customQueryFields)
        .from(opts.tableName)
        .then(xs => this.decodeAll(xs))
    }

    async insert(data: any): Promise<string> {
      return await this.db.knex
        .insert({ ...this.encode(data), id: uuid() })
        .into(opts.tableName)
        .returning('id')
        .then(x => x[0])
    }

    async update(id: string, data: any): Promise<void> {
      await this.db.knex
        .update({ ...this.encode(data), id })
        .into(opts.tableName)
    }

    async delete(id: string): Promise<void> {
      await this.db.knex
        .delete()
        .from(this.tableName)
        .where('id', id)
    }
  }

  return CrudRepositoryBase
}
