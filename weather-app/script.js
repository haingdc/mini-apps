var APIURL_MetaWeather = 'http://localhost:3001/api/';    // proxy to https://www.metaweather.com/api/
var APIURL_OpenWeatherMap = 'http://localhost:3001/data'; // proxy to http://api.openweathermap.org/data
var apikey = '3265874a2c77ae4a04bb96236a642d2f'
var todo = document.getElementById('search');

async function getWeatherByLocation_MetaWeather(location) {
  var resp = await fetch(APIURL_MetaWeather + 'location/search/?query=' + location);
  var respData = await resp.json();
  addWeatherToPage(respData);
}

var main = document.getElementById('main');
var form = document.getElementById('form');
var search = document.getElementById('search');

var url = location => `${APIURL_OpenWeatherMap}/2.5/weather?q=${location}&appid=${apikey}`;
async function getWeatherByLocation_OpenWeatherMap(location) {
  var resp = await fetch(url(location), { origin: 'cors' });
  var respData = await resp.json();
  addWeatherToPage(respData);
}

function KtoC(K) {
  return (K - 273.15).toFixed(2);
}

function addWeatherToPage(data) {
  var temp = KtoC(data.main.temp);
  var weather = document.createElement('div');
  weather.classList.add('weather');
  console.log({data})
  weather.innerHTML = `
    <h2>${temp}°C</h2>
    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" />
  `;

  main.innerHTML = '';
  main.appendChild(weather);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  var location = search.value;
  if (location) {
    getWeatherByLocation_OpenWeatherMap(location);
  }
});
search.value = 'Hanoi';
getWeatherByLocation_OpenWeatherMap(search.value);