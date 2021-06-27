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
  var { count, increment, decrement, reset } = props

  return React.createElement(
    'div', { className: 'counter' },
    React.createElement('h2', undefined, 'Counter'),
    React.createElement('div', undefined,
      React.createElement('button', { onClick: decrement }, '-'),
      React.createElement('span', undefined, count),
      React.createElement('button', { onClick: increment }, '+'),
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

var reducers = Redux.combineReducers({
  counter: reducerCounter,
  heroes : reducerHeroes,
})

/* Reducers end here */

var store = Redux.createStore(reducers, Redux.applyMiddleware(ReduxThunk.default))
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "RESET" });

function App() {
  return React.createElement
  (
    ReactRedux.Provider, { store: store },
    React.createElement(CounterRedux),
    React.createElement(HeroListRedux)
  )
}
ReactDOM.render(
  React.createElement(App),
  document.querySelector('#fruit-list')
)