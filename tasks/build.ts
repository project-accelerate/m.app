import { createShellCmd } from './utils/shell'

export function buildAll() {
  buildFrontendWeb()
}

export function buildFrontendWeb() {
  const runFrontendScript = createShellCmd('node', { cwd: 'frontend/web' })
  runFrontendScript('scripts/build')
}
