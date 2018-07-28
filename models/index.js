'use strict';

const app = require('./app')
const article = require('./article')
const developer = require('./developer')
const top_ten = require('./top_ten')
const blacklist = require('./blacklist')
const user = require('./user')

module.exports = {
    app,
    article,
    developer,
    top_ten,
    blacklist,
    user
}

