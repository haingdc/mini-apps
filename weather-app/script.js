var APIURL_MetaWeather = 'http://localhost:3001/api/'; // proxy to https://www.metaweather.com/api/
var APIURL_OpenWeatherMap = 'http://localhost:3001/data'; // proxy to http://api.openweathermap.org/data
var apikey = '3265874a2c77ae4a04bb96236a642d2f'
var todo = document.getElementById('search');

async function getWeatherByLocation_MetaWeather(location) {
  var resp = await fetch(APIURL_MetaWeather + 'location/search/?query=' + location);
  var respData = await resp.json();
  console.log(respData);
}

var url = location => `${APIURL_OpenWeatherMap}/2.5/weather?q=${location}&appid=${apikey}`;
async function getWeatherByLocation_OpenWeatherMap(location) {
  var resp = await fetch(url(location), { origin: 'cors' });
  var respData = await resp.json();
  console.log(respData);
}

getWeatherByLocation_OpenWeatherMap('London');