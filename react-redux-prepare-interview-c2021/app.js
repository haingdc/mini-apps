var { all, call, put, takeEvery } = ReduxSagaEffects

function mapStateToProps(state) {
  return {
    count: state.counter.count,
  }
}

var mapDispatchToProps = {
  increment() {
    return { type: 'INCREMENT' }
  },
  decrement() {
    return { type: 'DECREMENT' }
  },
  reset() {
    return { type: 'RESET'     }
  }
}

var CounterRedux = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Counter)

function Counter(props) {
  var { count, increment, incrementAsync, decrement, reset } = props

  return React.createElement(
    'div', { className: 'counter' },
    React.createElement('h2', undefined, 'Counter'),
    React.createElement('div', undefined,
      React.createElement('button', { onClick:    decrement   }, '-'),
      React.createElement('span'  , undefined, count),
      React.createElement('button', { onClick:    increment   }, '+'),
      React.createElement('button', { onClick: incrementAsync }, '+\'\''),
    )
  )
}


/* HeroList */
function mapStateToProps_heroes(state) {
  return {
    items  : state.heroes.items,
    error  : state.heroes.error,
    loading: state.heroes.loading,
  }
}

var mapDispatchToProps_heroes = {
  fetchHeroes() {
    return fetchHeroes()
  },
}

var HeroListRedux = ReactRedux.connect(mapStateToProps_heroes, mapDispatchToProps_heroes)(HeroList)

function fetchHeroes() {
  return function getThunkAction(dispatch) {
    dispatch({ type: 'FETCH_HEROES_BEGIN'})
    return fetch('http://localhost:8000/api/heroList')  // call api from rusty-rocket-live-7140327 in mini-apps
      .then(res => res.json())
      .then(json => {
        dispatch({ type: 'FETCH_HEROES_SUCCESS', payload: { heroes: json.heroes } })
      })
      .catch(error => dispatch({ type: 'FETCH_HEROES_SUCCESS', payload: { error } }))
  }
}

function HeroList(props) {
  var { error, loading, items, fetchHeroes } = props
  React.useEffect(function callApi() {
    fetchHeroes()
  }, [])
  var content
  if (error) {
    content = React.createElement('div', undefined, `Error! ${error.message}`)
  }
  if (loading) {
    content = React.createElement('div', undefined, 'Loading...')
  }
  if (!items.length) {
    content = React.createElement('div', undefined, 'Empty')
  }
  else {
    content = React.createElement('ul', undefined,
      items.map(function mapItem(e) {
        return React.createElement('li', { key: e.id }, e.name)
      })
    )
  }
  return React.createElement('div', undefined,
    React.createElement('div', undefined, `* Make sure rust server 'rusty-rocket-live-7140327' is running and we have already called adding api first`),
    content
  )
}

/* HeroList end */

/* Buddy */
function selectRandomFactNature(state) {
  return state.random.fact.nature
}

function selectRandomFictionDev(state) {
  return state.random.fiction.dev
}

function selectFirstName(state) {
  return state.personal.name.first
}

function selectLastName(state) {
  return state.personal.name.last
}

var selectFullName = Reselect.createSelector(
  selectFirstName,
  selectLastName,
  function join(str1, str2) {
    return `${str1} ${str2}`
  }
)

function selectHeight(state) {
  return state.personal.physical.height
}

var selectHeightInFeet = Reselect.createSelector(
  selectHeight,
  function fromInchtoFeet(v) {
    return v / 12
  }
)

var mapStateToProps_display = Reselect.createStructuredSelector({
  dev     : selectRandomFictionDev,
  fullName: selectFullName,
  height  : selectHeightInFeet,
  nature  : selectRandomFactNature,
})

function Display(props) {
  var { nature, dev, fullName, height } = props
  return React.createElement('div', undefined,
    React.createElement('div', undefined,
      React.createElement('strong', undefined, 'Fact or Fiction'),
      React.createElement('br'),
      React.createElement('br'),
      `Nature: ${nature}`,
      nature,
      React.createElement('br'),
      React.createElement('br'),
      `Dev: ${dev}`
    ),
    React.createElement('br'),
    React.createElement('br'),
    React.createElement('br'),
    React.createElement('div', undefined,
      React.createElement('strong', undefined, 'Fact or Fiction'),
      React.createElement('br'),
      React.createElement('br'),
      `Full Name: ${fullName}`,
      React.createElement('br'),
      `Height: ${height}`
    ),
  )
}

var DisplayRedux = ReactRedux.connect(mapStateToProps_display)(Display)
/* Buddy end */

/* Reducers start here */
var initialStateCounter = {
  count  : 0,
}

function reducerCounter(state = initialStateCounter, action) {
  switch(action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        count: state.count - 1
      }
    case 'RESET':
      return {
        count: 0,
      }
    default:
      return state
  }
}

var initialStateHeroes = {
  items  : [],
  loading: false,
  error  : undefined,
}

function reducerHeroes(state = initialStateHeroes, action) {
  console.log('reducer heroes', state, action)
  switch(action.type) {
    case 'FETCH_HEROES_BEGIN':
      return {
        ...state,
        loading: true,
        error  : undefined,
      }
    case 'FETCH_HEROES_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload.heroes || [],
      }
    case 'FETCH_HEROES_ERROR':
      return {
        ...state,
        loading: false,
        error  : action.payload.error,
        items  : [],
      }
    default:
      return state
  }
}

var initialStateBuddy = {
  db: {
    info: {
      name: {
        first: "Anakin",
        last: "Skywalker",
      },
      physical: {
        height: 75,
        weight: "Classified :)",
        medical: {
          vacinnated: true,
          terminalConditions: ["Asthma", "Chronic Burns"],
        }
      }
    }
  },
  random: {
    fact: {
      nature: "The sky is blue",
      dev: "Undefined is not a function",
    },
    fiction: {
      nature: "Sharks can drown",
      dev: "Javascript is Java for scripts",
    }
  },
}

function reducerPerson(state = initialStateBuddy.db.info, action) {
  switch(action.type) {
    case 'UPDATE_FIRST_NAME':
      return {
        ...state,
        name: {
          first: action.payload.firstName,
          last: state.name.last,
        },
      }
  }
  return state
}

function reducerRandom(state = initialStateBuddy.random, action) {
  return state
}

var reducers = Redux.combineReducers({
  counter : reducerCounter,
  heroes  : reducerHeroes,
  personal: reducerPerson,
  random  : reducerRandom,
})

/* Reducers end here */

var sagaMiddleware = ReduxSaga.default()

var store = Redux.createStore(
  reducers,
  {},
  Redux.applyMiddleware(ReduxThunk.default, sagaMiddleware)
)

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "RESET" });
sagaMiddleware.run(rootSaga)

function App() {
  return React.createElement
  (
    ReactRedux.Provider, { store: store },
    React.createElement(CounterRedux, { incrementAsync: () => store.dispatch({ type: 'INCREMENT_ASYNC' }) }),
    React.createElement(HeroListRedux),
    React.createElement(DisplayRedux)
  )
}
ReactDOM.render(
  React.createElement(App),
  document.querySelector('#fruit-list')
)

export function* helloSaga() {
  console.log('Hello Sagas!')
}

export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({ type: 'INCREMENT' })
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
  ])
}

function delay(ms) {
  return new Promise(res => setTimeout(res, ms))
}

window.store          = store
window.sagaMiddleware = sagaMiddleware
window.helloSaga      = helloSaga