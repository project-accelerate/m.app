import uuid from 'uuid'
import { flatMap, mapValues, forEach } from 'lodash'
import Knex from 'knex'
import { WithoutId } from './WithoutId'
import { Container } from 'typedi'
import { DatabaseConnection } from './DatabaseConnection'
import {
  RelationRepository,
  RelationRepositoryProps,
} from './RelationRepository'

export interface CrudRepository<T = {}, Props = {}> {
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
   * Generate a repository for the related repository
   */
  relationTo<T>(
    repo: CrudRepositoryType<T>,
    opts: RelationRepositoryProps,
  ): RelationRepository<T>

  /**
   * Encode an object for insertion into the database, using the fieldConverters
   * in the repository config
   */
  encode(value: Props): any

  /**
   * Decode an object returned from the database, using the fieldConverters
   * in the repository config
   */
  decode(value: any): T

  /**
   * Decode objects returned from the database, using the fieldConverters
   * in the repository config
   */
  decodeAll(value: any[]): T[]

  /**
   * Find all instances of an object matching the condition
   */
  find(clauses: SelectClauses<T>): Promise<T[]>

  /**
   * Find an object
   */
  findOne(clauses: SelectClauses<T>): Promise<T | undefined>

  /**
   * Find an object by id
   */
  delete(clauses: SelectClauses<T>): Promise<void>

  /**
   * Find an object by id, throwing if not found
   */
  findOneRequired(clauses: SelectClauses<T>): Promise<T>

  /**
   * Return all instances
   */
  findAll(): Promise<T[]>

  /**
   * Insert an object into the database
   */
  insert(data: Props): Promise<T>

  /**
   * Insert many objects into the database
   */
  bulkInsert(data: Props[]): Promise<void>

  /**
   * Update an object into the database
   */
  update(id: string, data: Change<Partial<Props>>): Promise<void>
}

export type CrudRepositoryType<T = {}> = new (
  ...args: string[]
) => CrudRepository<T, {}>

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

const ONE_OF = Symbol('ONE_OF')

export function oneOf<T>(...xs: T[]): OneOf<T> {
  return { [ONE_OF]: true, value: new Set(xs) }
}

export function isOneOf<T>(x: T | OneOf<T>): x is OneOf<T> {
  return (x as any)[ONE_OF]
}

export interface OneOf<T> {
  [ONE_OF]: true
  value: Set<T>
}

export type Change<T> = { [P in keyof T]: T[P] | Knex.QueryBuilder }
export type SelectClauses<T> = Partial<{ [P in keyof T]: OneOf<T[P]> | T[P] }>
export type SelectClause<T> = OneOf<T>

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

    encodeField(value: any, key: string) {
      const convert = fieldConverters[key] || {}
      return convert.from ? convert.from(value) : value
    }

    encodeOneOf(value: OneOf<any>, key: string) {
      return Array.from(value.value).map(x => this.encodeField(x, key))
    }

    encode(value: Partial<T>): any {
      return mapValues(value, (value, key) => this.encodeField(value, key))
    }

    encodeClauses(
      clauses: SelectClauses<T>,
    ): (q: Knex.QueryBuilder) => Knex.QueryBuilder
    encodeClauses(clauses: any) {
      return Object.keys(clauses).reduce(
        (prev, key) => (q: Knex.QueryBuilder) => {
          if (isOneOf(clauses[key])) {
            return prev(q).whereIn(key, this.encodeOneOf(clauses[key], key))
          } else {
            return prev(q).where(key, this.encodeField(clauses[key], key))
          }
        },
        (q: Knex.QueryBuilder) => q,
      )
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

    relationTo<T>(
      repo: CrudRepositoryType<T>,
      opts: RelationRepositoryProps,
    ): RelationRepository<T> {
      return new RelationRepository(CrudRepositoryBase, repo, opts)
    }

    async find(clauses: SelectClauses<T>): Promise<T[]> {
      return await this.db.knex
        .select('*', ...this.customQueryFields)
        .from(opts.tableName)
        .where(this.encodeClauses(clauses))
        .then(xs => this.decodeAll(xs))
    }

    async findOne(clauses: SelectClauses<T>): Promise<T | undefined> {
      return await this.db.knex
        .select('*', ...this.customQueryFields)
        .first()
        .from(opts.tableName)
        .where(this.encodeClauses(clauses))
        .then(x => this.decode(x))
    }

    async findOneRequired(clauses: SelectClauses<T>) {
      const item = await this.findOne(clauses)
      if (!item) {
        throw Error(`Not found: ${this.tableName}:${JSON.stringify(clauses)}`)
      }

      return item
    }

    async findAll() {
      return this.find({})
    }

    async insert(data: any): Promise<any> {
      return await this.db.knex
        .insert({ ...this.encode(data), id: uuid() })
        .into(opts.tableName)
        .returning('id')
        .then(x => ({ ...data, id: x[0] }))
    }

    async bulkInsert(data: any[]): Promise<any> {
      return await this.db.knex
        .insert(data.map(d => ({ ...this.encode(d), id: uuid() })))
        .into(opts.tableName)
        .returning('id')
    }

    async update(id: string, data: any): Promise<void> {
      await this.db.knex
        .update({ ...this.encode(data), id })
        .into(opts.tableName)
    }

    async delete(clauses: SelectClauses<T>): Promise<void> {
      await this.db.knex
        .delete()
        .from(this.tableName)
        .where(this.encodeClauses(clauses))
    }
  }

  return CrudRepositoryBase
}
