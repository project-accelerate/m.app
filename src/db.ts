import * as knex from 'knex'

export const db = knex(require('../knexfile'))
