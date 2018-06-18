import jwt from 'express-jwt'
import { expressJwtSecret } from 'jwks-rsa'
import { ContextCallback } from 'graphql-yoga/dist/src/types'
import { getEnv } from '../common/env'

// See:
// https://auth0.com/docs/api-auth/tutorials/verify-access-token#verify-the-signature
// https://19majkel94.github.io/type-graphql/docs/authorization.html

const auth0Domain = getEnv('AUTH0_DOMAIN')
const jwksUrl = `https://${auth0Domain}/.well-known/jwks.json`

/** Parse and validate the user's request token */
export const jwtMiddleware = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://my-authz-server/.well-known/jwks.json`,
  }),

  algorithms: ['RS256'],

  credentialsRequired: false,
})

/** Add the parsed user token to the GraphQL context */
export const userContext: ContextCallback = context => ({
  ...context,
  user: context.request.user,
})
