import db from '../db.js'
;(async () => {
  try {
    await db('farms').insert({
      siteinfor: 'New York',
      country: 'USA',
      latitude: 40.71,
      longitude: -74.01,
      elevation: 3.5,
      mat: null,
      map: null,
      // ClimateType: null,
      samplingdepth: null,
      samplingthickness: null,
      sandperc: null,
      siltperc: null,
      // ClayPerc: null,
      texture: null,
      soilph: null,
      covercrop: 'White_clover',
      covercropgroup: 'Legume',
      graincrop: 'Bean/Beet/Corn/Bean',
      graincropgroup: 'MTT',
      tillage_c: null,
      tillage_t: null,
      fertilization_c: null,
      fertilization_t: null,
      conservation_type: 'CC',
      controldescription: 'Fallow',
      yield_c: null,
      yield_t: null,
      // Weed_C: null,
      // Weed_T: null,
    })
    console.log('Added sample farms!')
    process.exit(0)
  } catch (err) {
    console.log(1)
    process.exit(1)
  }
})()
