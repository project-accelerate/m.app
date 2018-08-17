import { createShellCmd } from './utils/shell'

export function start(project: string, entry: string, ...rest: string[]) {
  const tsNode = createShellCmd('ts-node', { cwd: project })
  tsNode({ 'transpile-only': true }, entry, ...rest)
}
