

function Counter() {
  var [count, setCount] = React.useState(0)

  function increment() {
    setCount(v => v + 1)
  }

  function decrement() {
    setCount(v => v - 1)
  }

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

var initialState = {
  count: 0,
}

function reducer(state = initialState, action) {
  console.log('reducer', state, action)

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

var store = Redux.createStore(reducer)
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "RESET" });

function App() {
  return React.createElement
  (
    ReactRedux.Provider, { store: store },
    React.createElement(Counter)
  )
}
ReactDOM.render(
  React.createElement(App),
  document.querySelector('#fruit-list')
)