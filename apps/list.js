'use strict'

const db = require('../db')

const textResponseHeaders = {
  'Content-Type': 'text/plain'
};

const jsonResponseHeaders = {
  'Content-Type': 'application/json'
};

module.exports.list = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;

  db.app
    .findAll()
    .then(apps => {
      var response = {
        statusCode: 200,
        headers: jsonResponseHeaders,
        body: JSON.stringify(apps)
      };
      callback(null, response)
    })
    .catch(err => callback(null, {
      statusCode: 501,
      headers: textResponseHeaders,
      body: "Database Error: " + err
    }))
}