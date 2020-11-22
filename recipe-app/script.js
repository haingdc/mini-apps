var composeM = chainMethod => (...ms) => (
  ms.reduce((f, g) => x => g(x)[chainMethod](f))
);
var composePromises = composeM('then');

var appendChild = R.invoker(1, 'appendChild')

const APIs = {
  random_meal               : 'https://www.themealdb.com/api/json/v1/1/random.php'    ,
  look_up_meal_details_by_id: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
  search                    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
};
var favoriteMeals = document.getElementById('fav-meals')
var meals = document.getElementById('meals');
var searchTerm = document.getElementById('search-term');
var searchBtn = document.getElementById('search');


async function getRandomMeal() {
  var resp = await fetch(APIs.random_meal)
  var respData = await resp.json();
  var randomMeal = respData.meals[0];
  return Promise.resolve(randomMeal);
}

async function getMealById(id) {
  var resp = await fetch(APIs.look_up_meal_details_by_id + id);
  var respData = await resp.json();
  var meal = respData.meals[0];
  return meal;
}

async function getMealsBySearch(term) {
  var resp = await fetch(APIs.search + term);
  var respData = await resp.json();
  var meals = respData.meals;
  return meals === null ? [] : meals;
}



function createMealElement(mealData, random = false) {
  var meal = document.createElement('div');
  meal.classList.add('meal');

  meal.innerHTML = `
    <div class="meal-header">
      ${random ? `<span class="random">Random Recipe</span>` : ''}
      <img src="${mealData.strMealThumb}">
    </div>
    <div class="meal-body">
      <h4>${mealData.strMeal}</h4>
      <button class="fav-btn">
        <i class="fas fa-heart"></i>
      </button>
    </div>
  `;

  var btn = meal.querySelector('.meal-body .fav-btn');
  btn.addEventListener('click', function click() {
    if (btn.classList.contains('active')) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove('active');
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add('active');
    }

    fetchFavMeals();
  });

  return Promise.resolve(meal);
}

function addMealLS(mealId) {
  var mealIds = getMealsLS();

  localStorage.setItem('mealIds', JSON.stringify( [...mealIds, mealId] ));
}

function getMealsLS() {
  var mealIds = JSON.parse( localStorage.getItem('mealIds') );
  return mealIds === null ? [] : mealIds;
}

function removeMealLS(mealId) {
  var mealIds = getMealsLS();
  localStorage.setItem('mealIds', JSON.stringify( mealIds.filter(id => id !== mealId) ));
}

async function fetchFavMeals() {
  favoriteMeals.innerHTML = '';
  var mealIds = getMealsLS();

  for(let i=0; i<mealIds.length; i++) {
    var mealId = mealIds[i];
    meal = await getMealById(mealId);
    addMealFav(meal);
  }
}

function addMealFav(mealData) {
  var favMeal = document.createElement('li');

  favMeal.innerHTML = `
    <img src="${mealData.strMealThumb}" alt="">
    <span>${mealData.strMeal}</span>
    <button class="clear">
      <i class="fas fa-window-close"></i>
    </button>
  `;

  var btn = favMeal.querySelector('.clear');
  btn.addEventListener('click', function clear() {
    removeMealLS(mealData.idMeal);
    fetchFavMeals();
  });

  favoriteMeals.appendChild(favMeal);
}

var appendRandomMeal = composePromises(
  R.curry( createMealElement )(R.__, true),
  getRandomMeal
);

fetchFavMeals();
appendRandomMeal().then( appendChild(R.__, meals) );


searchBtn.addEventListener('click', async function searchMeal() {
  var search = searchTerm.value;
  var mealList = await getMealsBySearch(search);
  mealList.forEach(meal => {
    createMealElement(meal).then( appendChild(R.__, meals) );
  });
});