import { getConnectionManager, createConnection, ConnectionOptions, getConnection } from "typeorm";
import { configureDb } from "../config/db";

let initialized = false

export function withDb(block: () => Promise<void>) {
  return async () => {
    if (!initialized) {
      initialized = true

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
