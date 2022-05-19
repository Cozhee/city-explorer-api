'use strict'

const axios = require('axios')
const express = require('express');
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3002;
const cors = require("cors");
app.use(cors());


app.get('/', (request, response) => {
    response.send('Hey there')
})

app.get('/weather', async (request, response) => {
        const latitude = request.query.lat
        const longitude = request.query.lon
        try {
            const dailyWeatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}&days=4`)
            const cityData = dailyWeatherData.data.data
            const something = cityData.map(something => new Forecast(something))
            response.send(something)
        } catch(err) {
            response.send(err.message)
        }

});

app.get('/movies', async (request, response) => {
    const city = request.query.city
    try {
        const fetchedMovies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}`)
        const movieList = fetchedMovies.data.results.map(movie => new Movie(movie))
        response.send(movieList)
    } catch(err) {
        response.send(err.message)
    }
})

app.use((error, request, response, next) => {
    response.status(500).send(error.message);
    console.log(error.message);
})

//catch all star route
app.get('*', (request, response) => {
    response.send('The request could not be found')
});

function Forecast(day) {
    this.date = day.datetime
    this.description = day.weather.description
}

function Movie(movie) {
    console.log(movie)
    this.title = movie.title
    this.overview = movie.overview
    this.release_date = movie.release_date
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
