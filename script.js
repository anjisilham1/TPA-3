const API_URL =  'https://api.themoviedb.org/3/movie/popular?api_key=943351888aaefe6d0163d75023032c8d&language=en-US&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?&api_key=943351888aaefe6d0163d75023032c8d&query=';

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const title = document.querySelector('.title')


// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}



function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, genres, release_date} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info"><br>
          <h4>${title}</h4>
          <p>realase:<br>${release_date}</p>
          <span class="${getClassByRate(vote_average)}">rating ${vote_average}</span>
          </div>
        `
        main.appendChild(movieEl)
    })
}



function getClassByRate(vote) {
    if(vote >= 8) {
        return 'blue'
    } else if(vote >= 6) {
        return 'green'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
    title.innerText = "You searched for " + '"' + searchTerm + '"';

})