'use strict'

const db = require('../db')

const textResponseHeaders = {
    'Content-Type': 'text/plain'
};

const jsonResponseHeaders = {
    'Content-Type': 'application/json'
};

module.exports.get = (event, context, callback) => {

    context.callbackWaitsForEmptyEventLoop = false;

    let id = event.pathParameters.id
    db.app
        .findById(id)
        .then(app => {
            var response = {
                statusCode: 200,
                headers: jsonResponseHeaders,
                body: JSON.stringify(app)
            };
            callback(null, response)
        })
        .catch(err => callback(null, {
            statusCode: 501,
            headers: textResponseHeaders,
            body: "Couldn't find the order, Error finding from DB, Error: " + err
        }))
}