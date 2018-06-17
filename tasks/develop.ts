import { createDockerUp } from './utils/docker'
import { createShellCmd } from './utils/shell'
import { resolve } from 'path'

const baseDockerfile = 'backend/docker/docker-compose.yml'
const devDockerfile = 'backend/docker/docker-compose.development.yml'

export function developBackend() {
  const up = createDockerUp([baseDockerfile, devDockerfile])
  up()
}

export function developFrontend() {
  const reactStatic = createShellCmd('react-static', { cwd: 'frontend/web' })
  reactStatic('start')
}

export function preview() {
  const up = createDockerUp([baseDockerfile])
  up()
}

export function developFrontendNative() {
  const expo = createShellCmd('exp', { cwd: 'frontend/native' })
  require('crna-make-symlinks-for-yarn-workspaces')(
    resolve('frontend', 'native'),
  )

  expo('start', { minify: false, lan: true, dev: true })
}
