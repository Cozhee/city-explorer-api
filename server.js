'use strict'

const express = require('express');
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3002;
const cors = require("cors");
app.use(cors());

let data = require('./data/weather.json');


app.get('/', (request, response) => {
    response.send('Hey there')
})

app.get('/weather', (request, response) => {
        const city = request.query.city
        const latitude = request.query.lat
        const longitude = request.query.lon

        const found = data.find((location) => location.city_name === city && location.lon == longitude && location.lat == latitude)

        try {
            const something = found.data.map(something => new Forecast(something))
            response.send(something)
        } catch(err) {
            response.send(err.message)
        }

        // response.send(found.data[0])
});

//catch all star route
app.get('*', (request, response) => {
    response.send('The request could not be found')
});

// class Forecast {
//     constructor(weatherObject) {
//         this.date = weatherObject.datetime;
//         this.description = weatherObject.weather;
//     }
// }

function Forecast(day) {
    this.date = day.datetime
    this.description = day.weather.description
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
