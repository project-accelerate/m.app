import * as uuid from 'uuid';
import { flatMap, mapValues } from 'lodash'
import { QueryBuilder } from 'knex';
import { db } from "../db";

export interface CrudRepository<T, Props> {
  findOne(id: string): Promise<T | undefined>
  insert(data: { [P in keyof Props]: Props[P] | QueryBuilder }): Promise<string>
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
  query?: (column: string) => QueryBuilder
}

export function CrudRepository<T, Props>(opts: CrudRepositoryConfig<T>): CrudRepositoryConstructor<T, Props> {
  const { fieldConverters = {} as any, tableName } = opts

  return class CrudRepositoryBase implements CrudRepository<T, Props> {
    static tableName = opts.tableName

    /**
     * Custom select clauses defined in the fieldConfig. These should be used in
     * custom queries
     */
    customQueryFields = flatMap(fieldConverters, (field: FieldConverter<any>, key: string) =>
      field.query ? [field.query(key)] : []
    )

    /**
     * Encode an object for insertion into the database, using the fieldConverters
     * in the repository config
     */
    encode<K extends keyof Props>(value: Props): any {
      return mapValues(value, (field: any, key: string) => {
        const convert = fieldConverters[key] || {}
        return convert.from ? convert.from(field) : field
      })
    }

    /**
     * Decode an object returned from the database, using the fieldConverters
     * in the repository config
     */
    decode<K extends keyof T>(value: any): T {
      return mapValues(value, (field: any, key: string) => {
        const convert = fieldConverters[key] || {}
        return convert.to ? convert.to(field) : field
      }) as any
    }

    /**
     * Find an object by id
     */
    async findOne(id: string): Promise<T | undefined> {
      return await db.select('*', ...this.customQueryFields)
        .first()
        .from(opts.tableName)
        .where('id', id)
        .then(x => this.decode(x))
    }

    /**
     * Insert an object into the database
     */
    async insert(data: Props): Promise<string> {
      return await db.insert({ ...this.encode(data), id: uuid() })
        .into(opts.tableName)
        .returning('id')
        .then(x => x[0])
    }
  }
}
