import 'core-js'
import 'reflect-metadata'
import { GraphQLServer } from 'graphql-yoga'
import * as log from 'winston'

import { configureGraphql } from "./graphql";
import { configureDb } from './db';

export async function configureWeb() {
  const { PORT } = process.env

  await configureDb()
  const schema = await configureGraphql()

  const server = new GraphQLServer({ schema })
  await server.start({
    port: PORT
  })

  log.info(`Application started on ${PORT}`)
}
