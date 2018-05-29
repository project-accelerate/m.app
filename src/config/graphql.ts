import 'reflect-metadata'
import { Container } from 'typedi'
import { buildSchema, useContainer }  from 'type-graphql'

export async function configureGraphql() {
  useContainer(Container)

  return buildSchema({
    resolvers: [
      `${__dirname}/../modules/*/web/*.ts`
    ],
  })
}
