'use strict'

const getMovies = require('./modules/movies')
const getWeather = require('./modules/weather')
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

app.get('/weather', getWeather);

app.get('/movies', getMovies)

app.use((error, request, response, next) => {
    response.status(500).send(error.message);
    console.log(error.message);
})

//catch all star route
app.get('*', (request, response) => {
    response.send('The request could not be found')
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
