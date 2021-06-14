import { ordinalSuffix } from './helper.js'

function App() {
  var [info, dispatch ] = React.useReducer(reducer, { err: '', num: '', computedFibs: [] })

  function runWorker (num, id) {
    dispatch({ type: "SET_ERROR", err: "" })
    var worker = new window.Worker('worker.js')
    worker.postMessage({ num })
    worker.onerror = R.identity
    worker.onmessage = function message(e) {
      var { time, fibNum } = e.data
      dispatch({ type: "UPDATE_FIBO", id, time, fibNum })
      worker.terminate()
    }
  }

  return React.createElement
  (
    'div', null,
    React.createElement('div', { className: 'heading-container' },
      React.createElement('h1', undefined, 'Computing the nth Fibonacci number')
    ),
    React.createElement('div', { className: 'body-container' },
      React.createElement('p', { id: 'error', className: 'error' }, info.err),
      React.createElement('div', { className: 'input-div' },
        React.createElement(
          'input',
          {
            type: 'number',
            value: info.num,
            className: 'number-input',
            placeholder: 'Enter a number',
            onChange(e) {
              dispatch({ type: "SET_NUMBER", num: window.Number(e.target.value) })
            },
          }),
        React.createElement(
          'button',
          {
            id: 'submit-btn',
            className: 'btn-submit',
            onClick() {
              if (info.num < 2) {
                dispatch({ type: "SET_ERROR", err: "Please enter a number greater than 2" })
                return;
              }
              const id = info.computedFibs.length
              dispatch({ type: "SET_FIBO", id, loading: true, nth: ordinalSuffix(info.num) })
              runWorker(info.num, id)
            },
          },
          'Calculate'
        ),
      ),
      React.createElement(Results, { results: info.computedFibs })
    ),
  )
}
ReactDOM.render(
  React.createElement(App),
  document.querySelector('#fruit-list')
)

function reducer(state = {}, action) {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, err: action.err }
    case "SET_NUMBER":
      return { ...state, num: action.num }
    case "SET_FIBO":
      return {
        ...state,
        computedFibs: [
          ...state.computedFibs,
          { id: action.id, nth: action.nth, loading: action.loading },
        ],
      }
    case "UPDATE_FIBO": {
      const curr = state.computedFibs.filter((c) => c.id === action.id)[0]
      const idx = state.computedFibs.indexOf(curr)
      curr.loading = false
      curr.time = action.time
      curr.fibNum = action.fibNum
      state.computedFibs[idx] = curr
      return { ...state }
    }
    default:
      return state
  }
}

function Results(props) {
  var { results } = props
  return (
    React.createElement('div', { id: 'results-container', className: 'result-container' },
      results.map(function getResult(fb) {
        var { id, nth, time, fibNum, loading } = fb
        return (
          React.createElement('div', { key: id, className: 'result-div' },
                            loading

                               ?
                  React.createElement('p', undefined,
                    'Calculating the ',
                    React.createElement('span', { className: 'bold', id: 'nth' }, nth),
                    ' Fibonacci number...',
                  )

                               :

                  React.createElement(React.Fragment, undefined,
                    React.createElement('p', { id: 'timer' },
                      'Time: ',
                      React.createElement('span', { className: 'bold' }, `${time} ms`)
                    ),
                    React.createElement('p', undefined,
                      React.createElement('span', { className: 'bold', id: 'nth' }, nth),
                      ' fibonacci number: ',
                      React.createElement('span', { className: 'bold', id: 'sum' }, fibNum),
                    )
                  )
          )
        )
      })
    )
  )
}