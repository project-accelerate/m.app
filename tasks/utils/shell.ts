import { ExecSyncOptions, execSync } from 'child_process'

export function createShellCmd(cmd: string, opts: ExecSyncOptions = {}) {
  return (...args: Args[]) => {
    console.log(encodeShellCmd(cmd, args))
    execSync(encodeShellCmd(cmd, args), {
      ...opts,
      stdio: 'inherit',
      env: {
        ...process.env,
        ...opts.env,
      },
    })
  }
}

export function encodeShellCmd(cmd: string | undefined, args: Args[]) {
  return [cmd, ...args.flatMap(handleArg)]
    .filter(item => typeof item !== 'undefined')
    .join(' ')
}

type ArgValue = string | number | boolean
export type Args = ArgValue | Record<string, ArgValue | ArgValue[]> | ArgValue[]

function handleArg(args: Args): ArgValue[] {
  if (Array.isArray(args)) {
    return args
  }

  if (typeof args === 'object') {
    return Object.keys(args).flatMap(key => {
      const value = args[key]

      if (value === true) {
        return [`--${key}`]
      }

      if (value === false) {
        return [`--no-${key}`]
      }

      return handleArg(value).flatMap(x => [`--${key}`, x])
    })
  }

  return [args]
}
