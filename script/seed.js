'use strict'

const {db, models: {User} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'cody',
      password: '123',
      email: 'cody@example.com',
      role: 'employee',
      firstname: 'Cody',
      lastname: 'Zucker',
      industry: 'Information Technology',
      location: 'New York',
      locationpreference: 'hybrid',
      salaryexpectation: 80000,
      jobstatus: 'employed',
      joblevel: 'mid-senior',
      jobseeking: 'open to new opportunities',
      yearsofexperience: 7,
      educationlevel: 'bachelors',
      languages: 'english, spanish'
    }),
    User.create({
      username: 'murphy',
      password: '123',
      email: 'murphy@example.com',
      role: 'employee',
      firstname: 'Murphy',
      lastname: 'Love',
      industry: 'Finance',
      location: 'Los Angeles',
      locationpreference: 'on-site',
      salaryexpectation: 150000,
      jobstatus: 'employed',
      joblevel: 'exec',
      jobseeking: 'open to new opportunities',
      yearsofexperience: 7,
      educationlevel: 'masters',
      languages: 'english'
    }),
    User.create({
      username: 'john_doe',
      password: '123',
      email: 'john.doe@example.com',
      role: 'employee',
      firstname: 'John',
      lastname: 'Doe',
      industry: 'Hospitality',
      location: 'New York',
      locationpreference: 'hybrid',
      salaryexpectation: 100000,
      jobstatus: 'employed',
      joblevel: 'mid-senior',
      jobseeking: 'open to new opportunities',
      yearsofexperience: 7,
      educationlevel: 'masters',
      languages: 'english, spanish'
    }),
    User.create({
      username: 'jane_smith',
      password: '123',
      email: 'jane.smith@example.com',
      role: 'employer',
      firstname: 'Jane',
      lastname: 'Smith',
      industry: 'Marketing',
      location: 'Los Angeles',
      locationpreference: 'remote',
      salaryexpectation: null,
      jobstatus: 'n/a',
      joblevel: 'associate',
      jobseeking: null,
      yearsofexperience: 3,
      educationlevel: 'bachelors',
      languages: 'english, french'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      john_doe: users[2],
      jane_smith: users[3]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
