var composeM = chainMethod => (...ms) => (
  ms.reduce((f, g) => x => g(x)[chainMethod](f))
);
var composePromises = composeM('then');

var appendChild = R.invoker(1, 'appendChild');

const APIs = {
  random_meal               : 'https://www.themealdb.com/api/json/v1/1/random.php'    ,
  look_up_meal_details_by_id: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
  search                    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
};
var favoriteMeals = document.getElementById('fav-meals')
var mealsEl = document.getElementById('meals');
var searchTerm = document.getElementById('search-term');
var searchBtn = document.getElementById('search');
var mealPopup = document.getElementById('meal-popup');
var popupCloseBtn = document.getElementById('close-popup');
var mealInfoEl = document.getElementById('meal-info');

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

///////// Start APIs

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

//////////
////////// End APIs

var appendNewMeal = R.pipe(
  R.prop('mealEl'),
  appendChild( R.__, mealsEl )
);

var getMealElement = composePromises(
  clickLike,
  clickMealInfoViewing,
  R.curryN( 2, createMealElement )(R.__, true)
);

var getRandomMealElement = composePromises(
  getMealElement,
  getRandomMeal
);

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

  return Promise.resolve({ mealData, mealEl: meal });
}

function clickMealInfoViewing(data) {
  var { mealData, mealEl } = data;
  mealEl.addEventListener('click', () => {
    showMealInfo(mealData);
  });
  return Promise.resolve(data);
}

function clickLike(data) {
  var { mealData, mealEl } = data;
  var btn = mealEl.querySelector('.meal-body .fav-btn');
  btn.addEventListener('click', function click(evt) {
    evt.stopPropagation();
    if (btn.classList.contains('active')) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove('active');
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add('active');
    }
    fetchFavMeals();
  });
  return Promise.resolve(data);
}

async function fetchFavMeals() {
  var mealIds = getMealsLS();

  var mealPromises = R.map(getMealById)(mealIds)
  Promise.all(mealPromises)
    .then(meals => {
      favoriteMeals.innerHTML = '';
      var mealElemPromises = R.map(meal => {
        return getMealFav(meal).then(appendMealFav);
      })(meals);

      Promise.all(mealElemPromises)
        .then(mealElems => {
          anime({
            targets: mealElems,
            translateY: [200, 0],
            duration: 1200,
            delay: (el, i) => {
              return 100 * i;
            },
          })
        });
    });
}

function createMealFav(mealData) {
  var favMealEl = document.createElement('li');

  favMealEl.innerHTML = `
    <img src="${mealData.strMealThumb}" alt="">
    <span>${mealData.strMeal}</span>
    <button class="clear">
      <i class="fas fa-window-close"></i>
    </button>
  `;

  return Promise.resolve({ favMealEl, mealData });
}

function clickPopupHiding(data) {
  var { favMealEl, mealData } = data;
  var btn = favMealEl.querySelector('.clear');
  btn.addEventListener('click', function clear(evt) {
    evt.stopPropagation();
    removeMealLS(mealData.idMeal);
    fetchFavMeals();
  });
  return Promise.resolve(data);
}

function clickPopupViewing(data) {
  var { favMealEl, mealData } = data;
  favMealEl.addEventListener('click', () => {
    showMealInfo(mealData);
  });
  return Promise.resolve(data);
}

var getMealFav = composePromises(
  clickPopupViewing,
  clickPopupHiding,
  createMealFav
);

var appendMealFav = R.pipe(
  R.prop('favMealEl'),
  appendChild( R.__, favoriteMeals )
);

searchBtn.addEventListener('click', async function searchMeal() {
  mealsEl.innerHTML = '';
  var search = searchTerm.value;
  var mealList = await getMealsBySearch(search);
  mealList.forEach(meal => {
    getMealElement(meal).then(appendNewMeal);
  });
});

popupCloseBtn.addEventListener('click', () => {
  anime({
    targets: mealPopup,
    translateX: [0, 300],
    opacity: [1, 0],
    easing: 'easeInOutQuad',
    duration: 250,
    complete: function(anim) {
      mealPopup.style.transform = ''
      mealPopup.style.opacity = ''
      mealPopup.classList.add('hidden');
    }
  });
});

function showMealInfo(mealData) {
  mealInfoEl.innerHTML = '';

  var mealEl = createMealInfo(mealData) ;
  mealInfoEl.appendChild(mealEl);
  mealPopup.classList.remove('hidden');
  anime({
    targets: mealPopup,
    translateX: [300, 0],
    opacity: [0.5, 1],
    easing: 'easeOutExpo',
    duration: 700,
    delay: 0,
  })
}

function createMealInfo(mealData) {
  var mealEl = document.createElement('div');

  var ingredients = [];
  for (let i = 0; i <= 20; i++) {
    if (mealData['strIngredient' + i]) {
      ingredients.push(`${mealData['strIngredient' + i]} - ${mealData['strMeasure'+i]}`);
    }
  }

  mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}" alt="">
    <p>${mealData.strInstructions}</p>
    <h3>Ingredients:</h3>
    <ul>
      ${
        ingredients
          .map(ing => `
            <li>
              ${ing}
            </li>
          `)
          .join('')
      }
    </ul>
  `;

  return mealEl;
}


fetchFavMeals();
getRandomMealElement().then(appendNewMeal);


let isDown = false;
let startX;
let scrollLeft;

favoriteMeals.addEventListener('mousedown', function todo(evt) {
  isDown = true;
  favoriteMeals.classList.add('active');
  startX = evt.pageX - favoriteMeals.offsetLeft;
  scrollLeft = favoriteMeals.scrollLeft;
});
favoriteMeals.addEventListener('mouseleave', function todo() {
  isDown = false;
  favoriteMeals.classList.remove('active');
});
favoriteMeals.addEventListener('mouseup', function todo() {
  isDown = false;
  favoriteMeals.classList.remove('active');
});
favoriteMeals.addEventListener('mousemove', function todo(evt) {
  if (!isDown) {
    return;
  }
  evt.preventDefault();
  var x= evt.pageX - favoriteMeals.offsetLeft;
  var walk = ( x - startX ) * 2.34;
  favoriteMeals.scrollLeft = scrollLeft - walk;
});
