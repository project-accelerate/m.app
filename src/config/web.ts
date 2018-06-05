import 'core-js'
import 'reflect-metadata'
import { GraphQLServer } from 'graphql-yoga'
import * as log from 'winston'

import { configureGraphql } from "./graphql";

export async function configureWeb() {
  const { PORT } = process.env

  const schema = await configureGraphql()

  const server = new GraphQLServer({
    schema
  })

  await server.start({
    port: PORT
  })

  log.info(`Application started on ${PORT}`)
}
