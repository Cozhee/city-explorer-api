'use strict';

const weather = require('./modules/weather.js');
const getMovies = require('./modules/movies')

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())

app.get('/movies', getMovies)

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
    const { lat, lon } = request.query;
    weather(lat, lon)
        .then(summaries => response.send(summaries))
        .catch((error) => {
            console.error(error);
            response.status(200).send('Sorry. Something went wrong!')
        });
}

app.use((error, request, response, next) => {
    response.status(500).send(error.message);
     console.log(error.message);
 })

app.get('*', (request, response) => {
    response.send('The request could not be found')
});

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));