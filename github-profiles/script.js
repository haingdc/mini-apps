var APIURL = 'https://api.github.com/users/';

var main = document.getElementById('main');
var form = document.getElementById('form');
var search = document.getElementById('search');

async function getUser(username) {
  var resp = await fetch(APIURL + username);
  var respData = await resp.json();
  createUserCard(respData);
  getRepos(username);
}

function createUserCard(user) {
  var card = document.createElement('div');
  card.classList.add('card');
  var { avatar_url, name, bio, followers, following, public_repos } = user;
  var cardHTML = `
    <div class="card">
        <div>
            <img class="avatar" src="${avatar_url}" alt="" />
        </div>
        <div class="user-info">
            <h2>${name}</h2>
            <p>${bio}</p>
            <ul class="info">
                <li>${followers}<strong>Followers</strong></li>
                <li>${following}<strong>Following</strong></li>
                <li>${public_repos}<strong>Repos</strong></li>
            </ul>

            <h4>Repos:</h4>
            <div id="repos"></div>
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
  }
});

async function getRepos(username) {
  var resp = await fetch(APIURL + username + '/repos');
  var respData = await resp.json();
  addReposToCard(respData);
}

function addReposToCard(repos) {
  var reposEl = document.getElementById('repos');
  repos
  .sort((a, b) => b.stargazers_count - a.stargazers_count)
  .slice(0, 10)
  .forEach(repo => {
    var { name, html_url } = repo;
    var repoEl = document.createElement('a');
    repoEl.classList.add('repo');
    repoEl.href = html_url;
    repoEl.innerText = name;
    repoEl.target = '_blank';
    reposEl.appendChild(repoEl);
  });
}

getUser('haingdc');