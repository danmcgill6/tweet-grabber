'use strict'

const Twit = require('twit')
const db = require('../db')

const consumer_key = process.env.CONSUMER_KEY
const consumer_secret = process.env.CONSUMER_SECRET
const access_token = process.env.CONSUMER_TOKEN
const access_token_secret = process.env.CONSUMER_TOKEN_SECRET


module.exports.refresh = (event, context, callback) => {

  const date = new Date()

  const timePeriod = date.getFullYear + '-' + date.getMonth - 1 + '-' + date.getDay

  const T = new Twit({
    consumer_key,
    consumer_secret,
    access_token,
    access_token_secret,
    timeout_ms: 60 * 1000,
    strictSSL: true,
  })


  db.app.findAll()
    .then(apps => {
      for (let x = 0; x < apps.length; x++) {
        let tweetCount = apps[x].tweets
        T.get('search/tweets', {
          // TODO: dynamic date
          q: `${apps[x].name} since:2018-05-11`,
          count: 100
        }, async function (err, data, response) {
          if (data.statuses[0]) {
            for (let i = 0; i < data.statuses.length; i++) {
              const blacklist = await db.blacklist.findAll({
                where: {
                  name: data.statuses[i].user.screen_name,
                  appName: apps[x].name
                }
              }).catch(e => console.log(e))

              if (blacklist.length === 0) {
                tweetCount++
                await db.blacklist.create({
                  name: data.statuses[i].user.screen_name,
                  appName: apps[x].name
                }).catch(e => console.log(e))
                apps[x].update({
                  tweets: tweetCount
                })
              }
            }
          }
        })
      }
    })
}