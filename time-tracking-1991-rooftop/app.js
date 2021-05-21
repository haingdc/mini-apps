import { e } from './utils/index.js'
import Header from './containers/header/index.js'
import Main   from './containers/main/index.js'

// const {createFactory, createElement: e} = React

function App() {
  return React.createElement
  (
    'div', null,
    [
      e(Header, { key: 'header' } ),
      e(Main  , { key: 'main'   } ),
    ]
  )
}
ReactDOM.render(
  React.createElement(App),
  document.querySelector('#fruit-list')
)