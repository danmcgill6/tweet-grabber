const db = require('./db')
db.app.destroy({
    where: {},
    truncate: true
  })
const {
    app,
    article,
    developer,
    top_ten,
    blacklist,
    user
} = require('./db')



const apps =  [{
 
    name:"nugs.net",
	shortDescription:"hello",
	longDescription:"hello"
},
{
  
    name:"flappy dunk",
	shortDescription:"hello",
	longDescription:"hello"
},
{
 
    name:"minion rush",
	shortDescription:"hello",
	longDescription:"hello"
},
{

    name:"blinkist",
	shortDescription:"hello",
	longDescription:"hello"
},
{

    name:"oilist",
	shortDescription:"hello",
	longDescription:"hello"
},
{

    name:"facetune",
	shortDescription:"hello",
	longDescription:"hello"
},
{
   
    name:"musical.ly",
	shortDescription:"hello",
	longDescription:"hello"
},]



async function seed() {
    console.log('db synced!')
    // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
    // executed until that promise resolves!

    // const users = await Promise.all([
    //     User.create({ email: 'cody@email.com', password: '123', phoneNumber: '310-555-5555', firstName: 'Cody', lastName: 'Bowers' }),
    //     User.create({ email: 'bruce@email.com', password: '123', phoneNumber: '310-555-5555', firstName: 'bruce', lastName: 'lee' }),
    //     User.create({ email: 'dan@email.com', password: '123', phoneNumber: '310-555-5555', firstName: 'Danny', lastName: 'Mcgill' }),
    //     User.create({ email: 'micah@email.com', password: '123', phoneNumber: '310-555-5555', firstName: 'Micah', lastName: 'Friendland' }),
    //     User.create({ email: 'alex@email.com', password: '123', phoneNumber: '310-555-5555', firstName: 'Alex', lastName: 'V' }),
    //     User.create({ email: 'bobby@email.com', password: '123', phoneNumber: '310-555-5555', firstName: 'Bobby', lastName: 'Bowers' }),
    //     // User.create({ email: 'murphy@email.com', password: '123' }),
    // ])
    // Wowzers! We can even `await` on the right-hand side of the assignment operator
    // and store the result that the promise resolves to in a variable! This is nice!

  
    const new_apps = await Promise.all(
        apps.map(data => app.create(data))
    ).catch(err => console.log('ERRRRRROOROROROR',err))

    // const allFolders = await Promise.all(
    //     folders.map(folder => Folder.create(folder)),
    // )

    // const allCodeBlocks = await Promise.all(
    //     codeBlocks.map(block => CodeBlock.create(block)),
    // )

    console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
    .catch(err => {
        console.error(err.message)
        console.error(err.stack)
        process.exitCode = 1
    })
    .then(() => {
        console.log('closing db connection')
        db.sequelize.close()
        console.log('db connection closed')
    })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')