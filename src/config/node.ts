import log from "winston"

process.on('unhandledRejection', err => {
  process.stderr.write(`${err.message}\n`)
  process.stderr.write(`${err.stack}\n`)
  process.exit(1)
})

if (process.env.LOG_LEVEL) {
  log.level = process.env.LOG_LEVEL
}
