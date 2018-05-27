import { execute, parse } from 'graphql'
import { configureGraphql } from "../config/graphql";
import { db } from '../db';

/** 
 * Execute a graphql query against the api, returning the response payload
 * or any errors
 */
export async function execQuery(query: string, variables?: {}) {
  const schema = await configureGraphql()

  return execute({
    schema,
    document: parse(query),
    variableValues: variables
  })
}

/** 
 * Execute a graphql query against the api, returning the response payload
 * or failing the test if the query fails
 */
export async function execSuccessfulQuery(query: string, variables?: {}) {
  const result = await execQuery(query, variables)
  if (result && result.data) {
    return result.data
  }

  throw result && result.errors && result.errors[0] || new Error('Unknow query failure')
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
      await db.transaction(async (transaction) => {
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
