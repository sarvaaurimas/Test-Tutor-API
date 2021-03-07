/*
================================================================================
Author:         Edvardas Šalnis
Creation Date:  16th Jan 2021
Comments:       This module contains the middleware function for dealing with
                API errors.
================================================================================
*/

const actionFromMethod = {
  'GET': 'reading',
  'PUT': 'updating',
  'POST': 'adding',
  'DELETE': 'deleting'
}

const handleErrors = (err, req, res, next) => {
  const METHOD = req.actualOperation || req.method
  const ERRORS = [
    {
      source: {
        title: `Error ${actionFromMethod[METHOD]} data`,
        detail: err.message
      }
    }
  ]

  req.bodyOut = { errors: ERRORS }

  res.setHeader('content-type', 'application/vnd.api+json.')
  res.send(JSON.stringify(req.bodyOut))

  next()
}

module.exports = handleErrors