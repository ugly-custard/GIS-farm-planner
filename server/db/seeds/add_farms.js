import db from '../db.js';

;(async () => {
  try {
    await db('farms').insert ({
      name: 'Farm 1',
      location: 'Location 1',
      produce: 'Produce 1',
      contact: 'Contact 1',
      website: 'Website 1',
      img: 'Image 1',
    })
    await db('farms').insert ({
      name: 'Farm 2',
      location: 'Location 2',
      produce: 'Produce 2',
      contact: 'Contact 2',
      website: 'Website 2',
      img: 'Image 2',
    })

    console.log('Added sample farms!')
    process.exit(0)
  } catch (err) {
    console.log(1)
    process.exit(1)
  }
})()
