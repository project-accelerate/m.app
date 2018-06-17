/**
 * Simple task runner for development tasks and starting the app.
 *
 * Sets up some glboal environment stuff that the rest of the app expects
 * to be there, then calls through to the task function named by the first
 * argument
 *
 * Eg: tasks test foo will call the function "test" with argument "foo"
 */

import 'core-js'
import 'reflect-metadata'
import log from 'winston'

process.on('unhandledRejection', err => {
  process.stderr.write(`${err.message}\n`)
  process.stderr.write(`${err.stack}\n`)
  process.exit(1)
})

if (process.env.LOG_LEVEL) {
  log.level = process.env.LOG_LEVEL
}

const commands = {
  ...require('./generateGraphqlSchema'),
  ...require('./runTests'),
  ...require('./start'),
  ...require('./develop'),
  ...require('./build'),
}

const [_, __, cmd, ...args] = process.argv

const task = commands[cmd]
if (!task) {
  process.stdout.write(`Unknown command "${cmd || ''}"\n\n`)
  process.stdout.write(`Available commands are:\n`)

  Object.keys(commands).forEach(cmd => {
    process.stdout.write(`  ${cmd}\n`)
  })

  process.exit(1)
}

Promise.resolve(task(...args)).then(() => {
  process.exit()
})
