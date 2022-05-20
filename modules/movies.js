const axios = require("axios");

let cache = {}

async function getMovies(request, response)  {
    const city = request.query.city
    let key = city + 'Data'
    try {
        const timeOkToCache = 1000 * 60 * 60 * 2
        if(cache[key] && (Date.now() - cache[key].timestamp < timeOkToCache)) {
            response.status(200).send(cache[key].data)
        } else {
            const fetchedMovies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}`)
            const movieList = fetchedMovies.data.results.map(movie => new Movie(movie))

            cache[key] = {
                data: movieList,
                timestamp: Date.now()
            }
            response.send(movieList)
        }

    } catch(err) {
        response.send(err.message)
    }
}

function Movie(movie) {
    this.title = movie.title
    this.overview = movie.overview
    this.release_date = movie.release_date
}

module.exports = getMovies