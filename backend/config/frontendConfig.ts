import express from 'express'
import serialize from 'serialize-javascript'
import { mapValues } from 'lodash'
import * as configProperties from 'frontend.web/config/properties'

/** Provides configuration variables to frontend */
export function frontendConfig(): express.RequestHandler {
  const configValues = mapValues(configProperties, (_, key) => process.env[key])
  const configScript = `__CONFIG__=${serialize(configValues)}`

  return (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/javascript' })
    res.write(configScript)
    res.end()
  }
}
