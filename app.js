/*
==============================================================================
Author:         Edvardas Šalnis
Creation Date:  16th Jan 2021
Comments:       Organisation interface server app for Test And Tutor
==============================================================================
*/

const express = require('express')
const path = require('path')
const body_parser = require('body-parser')
const cors = require('cors')

const dotenv = require('dotenv')
  .config({ path: path.join(__dirname, '.env' )})

const app = express()
const port = process.env.PORT !== undefined ? process.env.PORT : 3000

app.set('port', parseInt(port))

app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: false }))

app.use(cors())

const APIs = require('./routes/route')
app.use(APIs)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = app