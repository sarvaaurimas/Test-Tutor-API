/*
==============================================================================
Author:         Edvardas Šalnis
Creation Date:  16th Jan 2021
Comments:       This module handles the routes for manipulating users.
==============================================================================
*/

const EXPRESS = require('express')
const ROUTER = EXPRESS.Router()

const USER = require(`../../modules/user`)
const ERROR_HANDLER = require(`../../modules/common/errors`)

const CONTENT = 'content-type'
const JSON_TYPE = 'application/vnd.api+json'

// Insert a new user
ROUTER.post('/users'
  , postUser = (req, res, next) => {
      USER.insertUser(req)
        .then(result => {
          res.setHeader(CONTENT, JSON_TYPE)
          res.status(200)
            .send(JSON.stringify({ data: result.rows[0] }))
          next()
        })
        .catch(error => next(error))
    }
  , ERROR_HANDLER
)

module.exports = ROUTER