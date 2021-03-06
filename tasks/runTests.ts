import { execSync } from 'child_process'
import { createShellCmd, encodeShellCmd } from './utils/shell'
import { createDockerRun } from './utils/docker'

const jestDockerConfigs = [
  'backend/docker/docker-compose.yml',
  'backend/docker/docker-compose.test.yml',
]

export function runAllTests() {
  typecheckAll()
  unitTest('frontend/common')
  unitTest('frontend/web')
  unitTest('backend')
  integrationTest('backend')
}

export function typecheckAll() {
  const { workspaces } = require('../package.json')
  workspaces.forEach(typecheck)
  typecheck('frontend/native')
}

export function typecheck(dir: string) {
  const tsc = createShellCmd('tsc', {
    cwd: dir,
  })

  tsc({ noEmit: true })
}

export function unitTest(dir: string, ...jestArgs: string[]) {
  const jest = createShellCmd('jest', { cwd: dir })
  jest({ clearCache: true })

  jest(
    {
      config: 'jest.config.json',
      watchman: false,
      forceExit: true,
    },
    ...jestArgs,
  )
}

export function integrationTest(dir: string, ...opts: string[]) {
  const jestInDocker = createDockerRun(
    jestDockerConfigs,
    'web',
    'node_modules/.bin/jest',
    { workdir: `/app/${dir}` },
  )

  const jestCmd = jestInDocker(
    {
      config: 'jest.integration.config.json',
      watchman: false,
      forceExit: true,
      runInBand: true,
    },
    ...opts,
  )
}
