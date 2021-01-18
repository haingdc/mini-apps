var APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
var IMGPATH = 'https://image.tmdb.org/t/p/w1280';
var SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

var main = document.querySelector('main');
var form = document.getElementById('form');
getMovies(APIURL);
var search = document.getElementById('search');

TweenMax.from("#search", 1, {
  delay: 0.7,
  opacity: 0,
  x: -20,
  ease: Expo.easeInOut
});


var appendChildToMain = appendChild(R.__, main);

var appendNewMovie = R.pipe(
  createNewElement,
  appendChildToMain
);

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
  innerHTML('', main);
  R.pipe(
    R.map(appendNewMovie),
    R.curryN(4, staggerFrom)(R.__, 0.9, {
      opacity: 0,
      x: -20,
      ease: Power3.easeInOut
    }, 0.08)
  )(movies);
}

