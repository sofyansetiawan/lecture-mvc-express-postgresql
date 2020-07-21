const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  port: 5433,
  database: 'lecture-pg'
})

module.exports = pool;