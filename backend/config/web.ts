import 'core-js'
import 'reflect-metadata'
import { GraphQLServer } from 'graphql-yoga'
import * as log from 'winston'
import { memoize } from 'async'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import * as express from 'express'

import { configureGraphql } from './graphql'
import { userContext, jwtMiddleware } from './auth0'
import { frontendConfig } from './frontendConfig'

export async function configureWeb(opts: { serveUI: boolean }) {
  const { PORT } = process.env

  const schema = await configureGraphql()

  const server = new GraphQLServer({
    schema,
    context: userContext,
  })

  server.express.use(jwtMiddleware)
  server.express.get('/config.js', frontendConfig())

  if (opts.serveUI) {
    server.express.use(express.static(frontendPath('build')))
    server.express.use(express.static(frontendPath('public')))
    server.express.get(
      '*',
      serveFile(readFileSync(frontendPath('build', 'index.html'))),
    )
  }

  await server.start({
    endpoint: '/graphql',
    playground: opts.serveUI ? false : '/graphql',
    port: PORT,
  })

  log.info(`Application started on ${PORT}`)
}

function serveFile(file: Buffer): express.RequestHandler {
  return (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(file)
    res.end()
  }
}

function frontendPath(...path: string[]) {
  return resolve('..', 'frontend', 'web', ...path)
}
