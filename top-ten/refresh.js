'use strict'

module.exports.refresh = (event, context, callback) => {

  //destroy the previous top ten

  //CHANGE THIS
  db.topten.findAll()
    .then(apps => {
      apps.forEach(app => {
        app.destroy({
          force: true
        })
      });
    })


  const updateTopTen = async function (apps) {
    const topTen = apps.slice(0, 10)
    const promises = []
    console.log('TOPTEN', topTen)
    //TODO(danmcgill6): update the spots in db using the current id
    for (let x = 0; x < topTen.length; x++) {
      await db.topten.create({
        name: topTen[x].name,
        shortDescription: topTen[x].shortDescription,
        longDescription: topTen[x].longDescription,
        tweets: topTen[x].tweets
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



