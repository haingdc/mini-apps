import { UnsplashSearcher } from './unsplash.js'

class List extends React.Component {
  render() {
    return React.createElement
    ('div', null, React.createElement(UnsplashSearcher))
  }
}

ReactDOM.render(
  React.createElement(List),
  document.querySelector('#fruit-list')
)