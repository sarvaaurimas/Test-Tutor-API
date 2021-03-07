/*
==============================================================================
Author:         Edvardas Lunys
Creation Date:  16th Jan 2021
Comments:       This module contains functions for manipulating users in the
                database.
==============================================================================
*/

const DB = require('./common/db_pool')
const SCHEMA = process.env.SCHEMA
const BCRYPT = require('bcrypt')
const VALIDATOR = require('email-validator');

const encrypt = (password) => {
  return BCRYPT.hashSync(password, 14)
}

// Insert user
const insertUser = async (req) => {
  const { id, firstName, lastName, email, curriculum, role, password } = req.body.data

  // Validate email
  if ('email' in req.body.data) {
    const emailIsValid = VALIDATOR.validate(req.body.data.email);
    if (!emailIsValid) {
      return Promise.reject({
        message: 'Please enter a valid email address'
      })
    }
  }

  // Validate Password
  if ('password' in req.body.data) {
    const passwordIsStrong = checkPassword(password);
    if (!passwordIsStrong) {
      return Promise.reject({
        message: 'Your password should be at least 8 characters long with a symbol, upper and lower case letters and a number'
      })
    }
  }

  return await DB.sQL(`
    with new_id as (
      select coalesce($7, gen_random_uuid()) as val
    )
    insert into ${SCHEMA}.users (
        id
      , first_name
      , last_name
      , email
      , curriculum
      , role
      , password
    ) 
    values (
      (select val from new_id)
      , $1
      , $2
      , $3
      , $4
      , $5
      , $6
    )
    returning 
      id
    , first_name as "firstName"
    , last_name as "lastName"
    , email
    , curriculum
    , role`
    , [
        firstName
      , lastName
      , email
      , curriculum
      , role
      , encrypt(password)
      , id
    ]
  )
}

// Following script for min 8 letter password, with at least a symbol, upper and lower case letters and a number
const checkPassword = (password) => {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return regex.test(password);
}

module.exports = {
  insertUser,
  checkPassword
}