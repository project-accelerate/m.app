import { execute, parse } from 'graphql'
import Container from 'typedi'
import Knex from 'knex'
import { AuthToken } from 'common/AuthToken'
import { configureGraphql } from '../config/graphql'
import { DatabaseConnection } from 'backend/common/DatabaseConnection'

interface ExecQueryProps<T> {
  body: string
  user?: AuthToken
  variables?: T
}

/**
 * Execute a graphql query against the api, returning the response payload
 * or failing the test if the query fails
 */
export async function execQuery<T>(
  q: string | ExecQueryProps<T>,
): Promise<any> {
  if (typeof q === 'string') {
    return execQuery({ body: q })
  }

  const { body, variables, user } = q

  const schema = await configureGraphql()

  const result = await execute({
    schema,
    document: parse(body),
    variableValues: variables,
    contextValue: {
      user,
    },
  })

  if (result && result.data) {
    return result.data
  }

  throw (result && result.errors && result.errors[0]) ||
    new Error('Unknow query failure')
}

/**
 * Wrap a test block in a database transaction, then roll back when completed
 */
export function withDb(block: () => Promise<void>) {
  return async () => {
    const db = Container.get(DatabaseConnection)
    const knex = db.knex

    let succeeded = false

    try {
      await knex.transaction(async transaction => {
        db.knex = transaction

        await block()

        succeeded = true
        await transaction.rollback()
      })
    } catch (err) {
      if (!succeeded) {
        throw err
      }
    } finally {
      db.knex = knex
    }
  }
}
