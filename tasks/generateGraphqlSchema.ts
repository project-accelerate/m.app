import { execSync } from 'child_process'
import { printSchema } from 'graphql'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { mkdirp } from 'mkdirp'

import { configureGraphql } from '../backend/config/graphql'
import { ConfigService } from 'backend/app/common/ConfigService'
import { Container } from 'typedi'

export async function graphqlSchema() {
  Container.get<ConfigService>(ConfigService).makeOptional()

  console.log('Loading schema...')
  const schema = await configureGraphql()
  mkdirp('tmp')
  writeFileSync(join('tmp', '.schema'), printSchema(schema), 'utf8')

  console.log('Generating schema.json...')
  execSync(
    join(
      'node_modules',
      '.bin',
      'apollo-codegen introspect-schema tmp',
      '.schema --output schema.json',
    ),
  )

  console.log('Generating query type definitions')
  execSync(
    join(
      'node_modules',
      '.bin',
      'apollo-codegen generate frontend',
      'native',
      '**',
      '*.graphql --schema schema.json --target typescript --output frontend',
      'native',
      'queries.ts',
    ),
  )
  execSync(
    join(
      'node_modules',
      '.bin/apollo-codegen generate frontend',
      'web',
      '**',
      '*.graphql --schema schema.json --target typescript --output frontend',
      'web',
      'queries.ts',
    ),
  )
}
