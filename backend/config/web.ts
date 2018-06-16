import 'core-js'
import 'reflect-metadata'
import { GraphQLServer } from 'graphql-yoga'
import * as log from 'winston'
import { memoize } from 'async';
import { readFileSync } from 'fs';

import { configureGraphql } from "./graphql";

export async function configureWeb(opts: { serveUI: boolean }) {
  const { PORT } = process.env

  const schema = await configureGraphql()

  const server = new GraphQLServer({
    schema
  })

  await server.start({
    endpoint: '/graphql',
    playground: opts.serveUI ? false : '/graphql',
    port: PORT
  })

  log.info(`Application started on ${PORT}`)
}

