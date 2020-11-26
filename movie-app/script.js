var APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
var IMGPATH = 'https://image.tmdb.org/t/p/w1280';
var SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

var main = document.querySelector('main');
var form = document.getElementById('form');
getMovies(APIURL);
var search = document.getElementById('search');

async function getMovies(url) {
  var resp = await fetch(url);
  var respData = await resp.json();

  showMovies(respData.results);
}

function getClassByRate(vote) {
  if (vote > 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  var searchTerm = search.value;
  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
  }
});

function showMovies(movies) {
  main.innerHTML = '';
  movies.forEach(movie => {
    var { poster_path, title, vote_average } = movie;
    var movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${IMGPATH + poster_path}" />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
    `;
    main.appendChild(movieEl);
  });
}