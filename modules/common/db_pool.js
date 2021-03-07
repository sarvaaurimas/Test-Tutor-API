/*
================================================================================
Author:         Edvardas Šalnis
Creation Date:  16th Jan 2021
Comments:       This module configures and initialises a database connection to
                use to send sql statements to the database. It uses a connection
                pool.
================================================================================
*/

const pg = require('pg')

const config = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
}

const pool = new pg.Pool(config)

module.exports = {
  sQL: (query, params, callback) => {
    return pool.query(query, params, callback)
  }
}