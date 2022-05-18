const axios = require('axios')

axios.create({
    baseURL: `https://api.weatherbit.io/v2.0/forecast/daily/key=${process.env.WEATHER_API_KEY}`,
});