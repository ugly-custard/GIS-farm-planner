import db from '../db.js'

;(async () => {
    try {
      await db.schema.dropTableIfExists('price_index')
      await db.schema.withSchema('public').createTable('price_index', (table) => {
        table.increments('id').unique().notNullable()
        table.string('Date').notNullable()
        table.float('wholesale_Price_Index').notNullable()
        table.float('Arhar')
        table.float('Bajra')
        table.float('soyabean')
        table.float('wheat')
        table.float('sugarcane')
        table.timestamps(true, true)
      })
      console.log('price index table created!')
      process.exit(0)
    } catch (err) {
      console.log(err)
      process.exit(1)
    }
})();