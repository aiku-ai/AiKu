// var MatomoTracker = require('matomo-tracker')

// // Initialize with your site ID and Matomo URL
// var matomo = new MatomoTracker(1, '')

// matomo.track({
//     url: 'http://localhost:3000',
//     action_name: 'Initial test',
//     cvar: JSON.stringify({
//         '1': ['customVar', 'route change detected']
//     })
// })
export default defineEventHandler(async (event) => {
    const body = readBody(event)
  
    console.log(body)
  
    event.node.res.end()
  })