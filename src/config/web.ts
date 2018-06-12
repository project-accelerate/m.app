import 'core-js'
import 'reflect-metadata'
import * as express from 'express';
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

  if (opts.serveUI) {
    const page404 = readFileSync("dist/404.html")
    
    server.express.use(express.static("dist"))
    server.express.get("*", renderStatic(page404, 404))
  }

  await server.start({
    endpoint: '/graphql',
    playground: '/graphql',
    port: PORT
  })

  log.info(`Application started on ${PORT}`)
}

function renderStatic(file: Buffer, status: number = 200): express.RequestHandler {
  return (req, res) => {
    res.writeHead(status, { "Content-Type": "text/html" })
    res.write(file)
    res.end()
  }
}
