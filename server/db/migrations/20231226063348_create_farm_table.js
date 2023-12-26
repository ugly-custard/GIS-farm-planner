import db from '../db.js';

;(async () => {
  try {
    await db.schema.dropTableIfExists('farms')
    await db.schema.withSchema('public').createTable('farms', (table) => {
      table.increments('id')
      table.string('name')
      table.string('location')
      table.string('produce')
      table.string('contact')
      table.string('website')
      table.string('img')
      table.timestamps(true, true)
    })
    console.log('farms table created!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()

