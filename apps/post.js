'use strict'

const db = require('../db')

module.exports.post = (event, context, callback) => {
  const body = JSON.parse(event.body);
  db.app
    .create({
      name: body.name,
      //CHANGED FROM SHORTDESCRIPTION TO SUMMARY
      summary: body.summary,
      //CHANGED FROM LONGDESCRIPTION TO DESCRIPTION
      description: body.description,
    })
    .then(app => {
      return callback(null, {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          app: app
        })
      });
    })
    //ADD .CATCH FOR CONSISTENCY    
}