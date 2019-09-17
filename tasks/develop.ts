import { createDockerUp, createDockerRun } from './utils/docker'
import { createShellCmd } from './utils/shell'
import { join } from 'path'
import { statSync, writeFileSync } from 'fs'

const baseDockerfile = 'backend/docker/docker-compose.yml'
const devDockerfile = 'backend/docker/docker-compose.development.yml'

export function developBackend() {
  const up = createDockerUp([baseDockerfile, devDockerfile])
  up()
}

export function runScheduledTask(id: string) {
  const run = createDockerRun(
    [baseDockerfile, devDockerfile],
    'web',
    'yarn start backend',
    { workdir: `/app` },
  )

  run('task', id)
}

export function developFrontend() {
  const runFrontendScript = createShellCmd('node', {
    cwd: join('frontend', 'web'),
  })
  runFrontendScript('scripts/start')
}

export function preview() {
  const up = createDockerUp([baseDockerfile])
  up()
}

export function developFrontendNative(channel?: 'local') {
  const expo = createShellCmd(join('node_modules', '.bin', 'expo'), {
    cwd: 'frontend/native',
  })

  // Ensure that google-services.json exists
  // If it doesn't, exp will behave unpredictably...
  ensureGoogleServicesConfigExists()

  if (channel === 'local') {
    expo('start', { lan: true, dev: true, config: 'app.localdev.json' })
  } else {
    expo('start', { lan: true, dev: true })
  }
}

export function storybook(target: string, port: string) {
  const storybook = createShellCmd(
    join('node_modules', '.bin', 'start-storybook'),
    {
      cwd: join('frontend', target),
    },
  )

  storybook({ port })
}

export function storybookExpo(target: string) {
  const expoBook = createShellCmd(join('node_modules', '.bin', 'expobook'), {
    cwd: join('frontend', target),
  })

  expoBook()
}

export function emulator(platform: string) {
  const expo = createShellCmd(join('node_modules', '.bin', 'expo'), {
    cwd: 'frontend/native',
  })

  expo(platform)
}

function ensureGoogleServicesConfigExists() {
  const googleServices = join('frontend', 'native', 'google-services.json')

  try {
    statSync(googleServices)
  } catch {
    writeFileSync(googleServices, '{}')
  }
}
