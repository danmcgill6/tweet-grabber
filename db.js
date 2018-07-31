'use strict'

require('dotenv').config()

const Sequelize = require('sequelize')

//USE STRING TEMPLATING HERE SET @BOMMING-APPS.... TO A VAR AND USE A TEMPLATE
const url_items = [
    'postgres://' +
    process.env.PG_USERNAME +
    ':' +
    process.env.PG_PASSWORD+
    '@bomming-apps.cdsxqnlho9ad.us-east-2.rds.amazonaws.com/booming_apps'
]

const db_URL = url_items.join()

const sequelize = new Sequelize(db_URL, {
    define: {
        timestamps: false
    },
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 20000,
        idle: 10000
    }
})

//TODO(danmcgill6): MAKE THIS ONE LINE
const app = require('./models/app')(sequelize, Sequelize)
const blacklist = require('./models/blacklist')(sequelize, Sequelize)
const developer = require('./models/developer')(sequelize, Sequelize)
const topten = require('./models/top_ten')(sequelize, Sequelize)
const article = require('./models/article')(sequelize, Sequelize)


const db = {
    Sequelize,
    sequelize,
    app,
    developer,
    blacklist,
    topten,
    article
}

db.sequelize.sync()

module.exports = db