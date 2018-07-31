'use strict'
const db = require('../db')

module.exports.refresh = (event, context, callback) => {

 

  const updateTopTen = async function (apps) {
    const topTen = apps.slice(0, 10)
    const promises = []
    for (let x = 1; x < topTen.length + 1; x++) {
      db.topten.findById(x)
      .then(app => {
        if(app)
          app.update(apps[x - 1])
        else
          console.log('APP',apps[x-1])
          db.topten.create({
            name: apps[x-1].name,
            shortDescription: apps[x-1].shortDescription,
            longDescription: apps[x-1].longDescription,
            tweets: apps[x-1].tweets,

          })
      })
    }
  }

  db.app.findAll()
    .then(apps => {
      apps.sort(function (a, b) {
        return a.tweets > b.tweets
      });
      updateTopTen(apps)
    })
}



