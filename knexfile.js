const { snakeCase, camelCase } = require('lodash')
const { join } = require('path')

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: join(__dirname, 'db/migrations'),
  },
}
