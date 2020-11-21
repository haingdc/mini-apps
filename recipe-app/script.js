const APIs = {
  random_meal: 'https://www.themealdb.com/api/json/v1/1/random.php',
  look_up_meal_details_by_id: ' https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
  search: ' https://www.themealdb.com/api/json/v1/1/search.php?s=',
};
var meals = document.getElementById('meals');


async function getRandomMeal() {
  var resp = await fetch(APIs.random_meal)
  var respData = await resp.json();
  var randomMeal = respData.meals[0];
  console.log(randomMeal);

  addMeal(randomMeal, true);
}
getRandomMeal();

async function getMealById(id) {
  var meal = await fetch(APIs.look_up_meal_details_by_id + id);
}

async function getMealsBySearch(term) {
  var meals = await fetch(APIs.search + term)
}



function addMeal(mealData, random = false) {
  var meal = document.createElement('div');
  meal.classList.add('meal');

  meal.innerHTML = `
    <div class="meal-header">
      ${random ? `<span class="random">Random Recipe</span>` : ''}
      <img src="${mealData.strMealThumb}">
    </div>
    <div class="meal-body">
      <h4>${mealData.strMeal}</h4>
      <button class="fav-btn active">
        <i class="fas fa-heart"></i>
      </button>
    </div>
  `;

  var btn = meal.querySelector('.meal-body .fav-btn');
  btn.addEventListener('click', function click() {
    btn.classList.toggle('active');
  });

  meals.appendChild(meal);
}

