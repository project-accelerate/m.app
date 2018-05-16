import { getConnectionManager, createConnection, ConnectionOptions, getConnection } from "typeorm";
import { execute, parse } from 'graphql'
import { configureDb } from "../config/db";
import { configureGraphql } from "../config/graphql";

let dbConfigured = false

export async function execQuery(query: string, variables?: {}) {
  const schema = await configureGraphql()

  return execute({
    schema,
    document: parse(query),
    variableValues: variables
  })
}

export async function execSuccessfulQuery(query: string, variables?: {}) {
  const result = await execQuery(query, variables)
  if (result && result.data) {
    return result.data
  }

  throw result && result.errors && result.errors[0] || new Error('Unknow query failure')
}

export function withDb(block: () => Promise<void>) {
  return async () => {
    if (!dbConfigured) {
      dbConfigured = true

      await configureDb({
        synchronize: true
      })
    }

    const connection = getConnection()

    try {
      await block()

    } finally {
      const repositories = connection.entityMetadatas
        .map(entity => connection.getRepository(entity.name))

      repositories.forEach((rep) => {
        rep.delete({})
      })
    }
  }
}
