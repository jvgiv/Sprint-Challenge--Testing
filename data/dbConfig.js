const knex = require('knex')
const config = require('../knexfile.js')

const dbEnv = "testing" || 'development'

module.exports = knex(config[dbEnv])