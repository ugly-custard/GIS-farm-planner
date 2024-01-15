import db from '../db.js'

;(async () => {
    try {
      await db.schema.dropTableIfExists('price_index')
      await db.schema.withSchema('public').createTable('price_index', (table) => {
        table.increments('id').unique().notNullable()
        table.string('Date').notNullable()
        table.float('Food_Price_Index').notNullable()
        table.float('Meat')
        table.float('Dairy')
        table.float('Cereals')
        table.float('Oils')
        table.float('Sugar')
        table.timestamps(true, true)
      })
      console.log('price index table created!')
      process.exit(0)
    } catch (err) {
      console.log(err)
      process.exit(1)
    }
})();