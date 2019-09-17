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
  validateChannel(releaseChannel)
  const exp = createShellCmd(join('node_modules', '.bin', 'expo'), {
    cwd: 'frontend/native',
  })

  exp('build:android', {
    'release-channel': releaseChannel,
    config: getAppJson(releaseChannel),
  })
  exp('build:ios', {
    'release-channel': releaseChannel,
    config: getAppJson(releaseChannel),
  })
}

export function publishFrontendNative(releaseChannel = 'beta') {
  validateChannel(releaseChannel)
  const exp = createShellCmd(join('node_modules', '.bin', 'exp'), {
    cwd: 'frontend/native',
  })

  if (process.env.EXPO_USER && process.env.EXPO_PASSWORD) {
    exp('login', {
      username: process.env.EXPO_USER,
      password: process.env.EXPO_PASSWORD,
      config: getAppJson(releaseChannel),
    })
  }

  exp('publish', {
    'release-channel': releaseChannel,
    config: getAppJson(releaseChannel),
  })
}

function getAppJson(channel: string) {
  if (channel === 'beta') {
    return 'app.beta.json'
  }

  return 'app.json'
}

function validateChannel(channel: string) {
  const channelMap = require('../frontend/native/env.json')
  if (!channelMap[channel]) {
    throw Error(`invalid release channel: ${channel}`)
  }
}
