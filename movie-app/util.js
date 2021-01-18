var { staggerFrom } = TweenMax;

var appendChild = R.invoker(1, 'appendChild');

function prop(key, value, obj) {
  return obj[key] = value;
}

var innerHTML = R.curry(prop)('innerHTML');

function createNewElement(movie) {
  var { poster_path, title, vote_average, overview } = movie;
  var movieEl = document.createElement('div');
  movieEl.classList.add('movie');
  movieEl.innerHTML = `
    <img src="${IMGPATH + poster_path}" />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h4>Overview:</h4>
      <p>${overview}</p>
    </div>
  `;
  return movieEl;
}
