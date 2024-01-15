import db from '../db.js'
;(async () => {
  try {
    await db.schema.dropTableIfExists('farms')
    await db.schema.withSchema('public').createTable('farms', (table) => {
      table.increments('id').unique().notNullable()
      table.string('siteinfor').notNullable()
      table.string('country').notNullable()
      table.float('latitude').notNullable()
      table.float('longitude').notNullable()
      table.float('elevation').notNullable()
      table.integer('mat')
      table.integer('map')
      // table.string('ClimateType')
      table.string('samplingdepth')
      table.string('samplingthickness')
      table.integer('sandperc')
      table.integer('siltperc')
      // table.integer('ClayPerc')
      table.string('texture')
      table.integer('soilph')
      table.string('covercrop').notNullable()
      table.string('covercropgroup').notNullable()
      table.string('graincrop').notNullable()
      table.string('graincropgroup').notNullable()
      table.string('tillage_c')
      table.string('tillage_t')
      table.string('fertilization_c')
      table.string('fertilization_t')
      table.string('conservation_type')
      table.string('controldescription')
      table.integer('yield_c')
      table.integer('yield_t')
      // table.integer('Weed_C')
      // table.integer('Weed_T')
      table.timestamps(true, true)
    })
    console.log('farms table created!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()

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
})()

