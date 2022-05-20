// const axios = require("axios");
//
// let cache = {}
//
// async function getWeather (request, response) {
//     const latitude = request.query.lat
//     const longitude = request.query.lon
//
//     let key = longitude + 'Data'
//     try {
//         const timeOkToCache = 1000 * 60 * 60 * 2
//
//         if (cache[key]) {
//             response.status(200).send(cache[key])
//         } else (
//             // cache[key] = {
//             //     data:
//             // }
//             console.log('nothing')
//         )
//         const dailyWeatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}&days=4`)
//         const cityData = dailyWeatherData.data.data
//         const something = cityData.map(something => new Forecast(something))
//         response.send(something)
//     } catch(err) {
//         response.send(err.message)
//     }
//
// }
//
// function Forecast(day) {
//     this.date = day.datetime
//     this.description = day.weather.description
// }
//
// module.exports = getWeather