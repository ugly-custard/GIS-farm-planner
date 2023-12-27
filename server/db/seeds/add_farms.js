import db from '../db.js';

;(async () => {
  try {
    await db('farms').insert ({
      SiteInfor: 'New York',
      Country: 'USA',
      Latitude: 40.71,
      Longitude: -74.01,
      Elevation: 3.5,
      MAT: 'NA' ,
      MAP: 'NA',
      ClimateType: 'NA',
      SamplingDepth: 'NA',
      SamplingThickness: 'NA',
      SandPerc: 'NA',
      SiltPerc: 'NA',
      ClayPerc: 'NA',
      Texture: 'NA',
      SoilpH: 'NA',
      CoverCrop: 'White_clover',
      CoverCropGroup: 'Legume',
      GrainCrop: 'Bean/Beet/Corn/Bean',
      GrainCropGroup: 'MTT',
      Tillage_C: 'NA',
      Tillage_T: 'NA',
      Fertilization_C: 'NA',
      Fertilization_T: 'NA',
      Conservation_Type: 'CC',
      ControlDescription: 'Fallow',
      Yield_C: 'NA',
      Yield_T: 'NA',
      Weed_C: 'NA',
      Weed_T: 'NA',
    })
    console.log('Added sample farms!')
    process.exit(0)
  } catch (err) {
    console.log(1)
    process.exit(1)
  }
})()
