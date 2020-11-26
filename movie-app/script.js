var APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
var IMGPATH = 'https://image.tmdb.org/t/p/w1280';

async function getMovies() {
  var resp = await fetch(APIURL);
  var respData = await resp.json();

  respData.results.forEach(movie => {
    var { poster_path, title, vote_average } = movie;
    var movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${IMGPATH + poster_path}" />
      <div class="movie-info">
        <h3>${title}</h3>
        <span>${vote_average}</span>
      </div>
    `;
    document.body.appendChild(movieEl);
  });
  return respData;
}

console.log(getMovies());