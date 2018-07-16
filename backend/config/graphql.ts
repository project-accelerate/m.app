import 'reflect-metadata'
import { Container } from 'typedi'
import { buildSchema, useContainer } from 'type-graphql'
import { AuthToken } from 'common/AuthToken'
import { authValidator } from './auth0'

export interface GraphQLContext {
  user?: AuthToken
}

export async function configureGraphql() {
  useContainer(Container)

  return buildSchema({
    resolvers: [
      `${__dirname}/../app/*/web/*.ts`,
      `${__dirname}/../app/*/web/*.js`,
    ],
    authChecker: authValidator,
  })
}
