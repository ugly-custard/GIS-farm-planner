import db from '../db.js';

;(async () => {
  try {
    await db('farms').insert ({
      SiteInfor: 'New York',
      Country: 'USA',
      Latitude: 40.71,
      Longitude: -74.01,
      Elevation: 3.5,
      MAT: null ,
      MAP: null,
      ClimateType: null,
      SamplingDepth: null,
      SamplingThickness: null,
      SandPerc: null,
      SiltPerc: null,
      ClayPerc: null,
      Texture: null,
      SoilpH: null,
      CoverCrop: 'White_clover',
      CoverCropGroup: 'Legume',
      GrainCrop: 'Bean/Beet/Corn/Bean',
      GrainCropGroup: 'MTT',
      Tillage_C: null,
      Tillage_T: null,
      Fertilization_C: null,
      Fertilization_T: null,
      Conservation_Type: 'CC',
      ControlDescription: 'Fallow',
      Yield_C: null,
      Yield_T: null,
      Weed_C: null,
      Weed_T: null,
    },
    )
    console.log('Added sample farms!')
    process.exit(0)
  } catch (err) {
    console.log(1)
    process.exit(1)
  }
})()
