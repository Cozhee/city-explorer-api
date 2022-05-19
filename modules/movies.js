const axios = require("axios");

async function getMovies(request, response)  {
    const city = request.query.city
    try {
        const fetchedMovies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}`)
        const movieList = fetchedMovies.data.results.map(movie => new Movie(movie))
        response.send(movieList)
    } catch(err) {
        response.send(err.message)
    }
}

function Movie(movie) {
    console.log(movie)
    this.title = movie.title
    this.overview = movie.overview
    this.release_date = movie.release_date
}

module.exports = getMovies