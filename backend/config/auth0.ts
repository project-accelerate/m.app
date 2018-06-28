import jwt from 'express-jwt'
import { expressJwtSecret } from 'jwks-rsa'
import { ContextCallback } from 'graphql-yoga/dist/src/types'
import { ConfigService } from '../common/ConfigService'
import { Role } from '../../common/domain/Role'
import { AuthChecker } from 'type-graphql'
import { GraphQLContext } from './graphql'

const config = new ConfigService()

// See:
// https://auth0.com/docs/api-auth/tutorials/verify-access-token#verify-the-signature
// https://19majkel94.github.io/type-graphql/docs/authorization.html

const auth0Domain = config.get('AUTH0_DOMAIN')

/** Parse and validate the user's request token */
export const jwtMiddleware = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0Domain}/.well-known/jwks.json`,
  }),

  algorithms: ['RS256'],

  credentialsRequired: false,
})

/** Add the parsed user token to the GraphQL context */
export const userContext: ContextCallback = context => ({
  ...context,
  user: context.request.user,
})

export const authValidator: AuthChecker<GraphQLContext> = (
  { context },
  requiredRoles: string[],
) => {
  const { user } = context

  if (!user) {
    return false
  }

  const userRoles = user['http://peoplesmomentum.com/roles']
  if (!userRoles) {
    return false
  }

  return requiredRoles.every(role => userRoles.includes(role))
}
