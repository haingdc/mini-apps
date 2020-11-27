var APIURL = 'https://api.github.com/users/';

var main = document.getElementById('main');
var form = document.getElementById('form');
var search = document.getElementById('search');

async function getUser(user) {
  var resp = await fetch(APIURL + user);
  var respData = await resp.json();
  createUserCard(respData);
}

function createUserCard(user) {
  var card = document.createElement('div');
  card.classList.add('card');
  var { avatar_url, name, bio, followers, following, public_repos } = user;
  var cardHTML = `
    <div class="card">
        <div class="img-container">
            <img class="avatar" src="${avatar_url}" alt="" />
        </div>
        <div class="user-info">
            <h2>${name}</h2>
            <p>${bio}</p>
            <ul class="info">
                <li>${followers}</li>
                <li>${following}</li>
                <li>${public_repos}</li>
            </ul>
        </div>
    </div>
  `;

  main.innerHTML = cardHTML;
}

form.addEventListener('submit', function submit(e) {
  e.preventDefault();
  var user = search.value;
  if (user) {
    getUser(user);
    search.value = '';
  }
});