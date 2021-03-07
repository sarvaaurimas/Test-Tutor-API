/*
==============================================================================
Author:         Edvardas Šalnis
Creation Date:  16th Jan 2021
Comments:       This module handles routing for the API's.
==============================================================================
*/

const express = require('express')
const router = express.Router()

const USERS = require(`./routes/users.js`)

router.use('/', USERS)

module.exports = router