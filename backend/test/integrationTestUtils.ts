import { execute, parse } from 'graphql'
import { AuthToken } from 'common/AuthToken'
import { configureGraphql } from '../config/graphql'
import { db } from '../db/db'

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
    // Knex treats transaction rollback as an error. But we don't want to fail
    // tests on rollback, so check this flag to determine if the test finished
    // successfuly
    let success = false

    try {
      await db.transaction(async transaction => {
        await block()

        success = true
        await transaction.rollback()
      })
    } catch (err) {
      if (!success) {
        throw err
      }
    }
  }
}
