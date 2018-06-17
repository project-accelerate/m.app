import { execSync } from 'child_process'
import { createShellCmd, Args, encodeShellCmd } from './shell'

const dockerCompose = createShellCmd('docker-compose')

export function createDockerRun(
  files: string[],
  service: string,
  cmd?: string,
  ...runArgs: Args[]
) {
  return (...args: Args[]) => {
    dockerCompose({ file: files }, 'rm -sf')
    dockerCompose({ file: files }, 'build')

    dockerCompose(
      { file: files },
      'run',
      ...runArgs,
      { rm: true },
      service,
      encodeShellCmd(cmd, args),
    )
  }
}

export function createDockerUp(
  files: string[],
  cmd?: string,
  ...upArgs: Args[]
) {
  return (...args: Args[]) => {
    dockerCompose({ file: files }, 'rm -sf')
    dockerCompose({ file: files }, 'build')

    dockerCompose(
      { file: files },
      'up',
      ...upArgs,
      { 'force-recreate': true },
      encodeShellCmd(cmd, args),
    )
  }
}
