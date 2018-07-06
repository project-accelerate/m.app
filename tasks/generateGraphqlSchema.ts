import { execSync } from 'child_process'
import { printSchema } from 'graphql'
import { writeFileSync } from 'fs'

import { configureGraphql } from '../backend/config/graphql'
import { ConfigService } from 'backend/common/ConfigService'
import { Container } from 'typedi'

export async function graphqlSchema() {
  Container.get<ConfigService>(ConfigService).makeOptional()

  console.log('Loading schema...')
  const schema = await configureGraphql()
  execSync('mkdir -p tmp')
  writeFileSync('tmp/.schema', printSchema(schema), 'utf8')

  console.log('Generating schema.json...')
  execSync(
    'node_modules/.bin/apollo-codegen introspect-schema tmp/.schema --output schema.json',
  )

  console.log('Generating query type definitions')
  execSync(
    'node_modules/.bin/apollo-codegen generate frontend/native/**/*.graphql --schema schema.json --target typescript --output frontend/native/queries.ts',
  )
  execSync(
    'node_modules/.bin/apollo-codegen generate frontend/web/**/*.graphql --schema schema.json --target typescript --output frontend/web/queries.ts',
  )
}
