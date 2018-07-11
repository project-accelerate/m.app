import { createDockerUp } from './utils/docker'
import { createShellCmd } from './utils/shell'
import { resolve, join } from 'path'
import { spawn } from 'child_process'

const baseDockerfile = 'backend/docker/docker-compose.yml'
const devDockerfile = 'backend/docker/docker-compose.development.yml'

export function developBackend() {
  const up = createDockerUp([baseDockerfile, devDockerfile])
  up()
}

export function developFrontend() {
  const runFrontendScript = createShellCmd('node', { cwd: 'frontend/web' })
  runFrontendScript('scripts/start')
}

export function preview() {
  const up = createDockerUp([baseDockerfile])
  up()
}

export function developFrontendNative() {
  const expo = createShellCmd('node_modules/.bin/exp', {
    cwd: 'frontend/native',
  })
  expo('start', { lan: true, offline: true })
}

export function storybook(target: string, port: string) {
  const storybook = createShellCmd('node_modules/.bin/start-storybook', {
    cwd: join('frontend', target),
  })

  storybook({ port })
}

export function storybookExpo(target: string) {
  const expoBook = createShellCmd('node_modules/.bin/expobook', {
    cwd: join('frontend', target),
  })

  expoBook()
}
