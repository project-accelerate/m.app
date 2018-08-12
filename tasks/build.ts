import { createShellCmd } from './utils/shell'
import { join } from 'path'

export function buildAll() {
  buildFrontendWeb()
}

export function buildFrontendWeb() {
  const runFrontendScript = createShellCmd('node', {
    cwd: join('frontend', 'web'),
  })
  runFrontendScript('scripts/build')
}

export function buildFrontendNativeBinaries(releaseChannel = 'beta') {
  const exp = createShellCmd(join('node_modules', '.bin', 'exp'), {
    cwd: 'frontend/native',
  })

  exp('build:android', { 'release-channel': releaseChannel })
  exp('build:ios', { 'release-channel': releaseChannel })
}

export function publishFrontendNative(releaseChannel = 'beta') {
  const exp = createShellCmd(join('node_modules', '.bin', 'exp'), {
    cwd: 'frontend/native',
  })

  if (process.env.EXPO_USER && process.env.EXPO_PASSWORD) {
    exp('login', {
      username: process.env.EXPO_USER,
      password: process.env.EXPO_PASSWORD,
    })
  }

  exp('publish', { 'release-channel': releaseChannel })
}
