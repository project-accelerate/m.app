import uuid from 'uuid';
import { flatMap, mapValues } from 'lodash'
import * as Knex from 'knex';
import { db } from "../db";

export interface CrudRepository<T, Props> {
  /** Database object exposed for custom queries */
  db: Knex

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
   * Insert an object into the database
   */
  insert(data: { [P in keyof Props]: Props[P] | Knex.QueryBuilder }): Promise<string>
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

export function CrudRepository<T, Props>(opts: CrudRepositoryConfig<T>): CrudRepositoryConstructor<T, Props> {
  const { fieldConverters = {} as any, tableName } = opts

  return class CrudRepositoryBase implements CrudRepository<T, Props> {
    static tableName = opts.tableName

    db = db

    tableName = tableName

    customQueryFields = flatMap(fieldConverters, (field: FieldConverter<any>, key: string) =>
      field.query ? [field.query(key)] : []
    ) as any

    encode(value: Props): any {
      return mapValues(value, (field: any, key: string) => {
        const convert = fieldConverters[key] || {}
        return convert.from ? convert.from(field) : field
      })
    }

    decode(value: any): T {
      return mapValues(value, (field: any, key: string) => {
        const convert = fieldConverters[key] || {}
        return convert.to ? convert.to(field) : field
      }) as any
    }

    decodeAll(value: any[]): T[] {
      return value.map(row => this.decode(row))
    }

    async findOne(id: string): Promise<T | undefined> {
      return await db.select('*', ...this.customQueryFields)
        .first()
        .from(opts.tableName)
        .where('id', id)
        .then(x => this.decode(x))
    }

    async insert(data: Props): Promise<string> {
      return await db.insert({ ...this.encode(data), id: uuid() })
        .into(opts.tableName)
        .returning('id')
        .then(x => x[0])
    }
  }
}
