import { e } from './utils/index.js'
import Header from './containers/header/index.js'

// const {createFactory, createElement: e} = React

function App() {
  return React.createElement
  (
    'div', null,
    [
      e(Header, { key: 'header' })
    ]
  )
}
ReactDOM.render(
  React.createElement(App),
  document.querySelector('#fruit-list')
)