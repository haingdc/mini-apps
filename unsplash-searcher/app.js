import { UnsplashSearcher } from './unsplash.js'

function ListItem(props) {
  return React.createElement('li', { className: 'list-item', onClick: props.onDelete }, props.title)
}

class List extends React.Component {

  constructor() {
    super()
    this.state = { items: ['Apple', 'Banana'] }
  }

  addItemHandler() {
    this.setState(prevState => {
      return { items: prevState.items.concat('Apples') }
    })
  }

  onDelete(text) {
    this.setState(prevState =>
    {
      return {
        items: prevState.items.filter(item => {
          return item != text
        })
      }
    })
  }

  render() {
    return React.createElement
    ('div', null,
      [
        // React.createElement
        //   (
        //     'ul', { key: 'fruit-list' },
        //       this.state.items.map
        //       (
        //         item => {
        //           return React.createElement( ListItem, {
        //             title : item,
        //             key: item,
        //             onDelete: this.onDelete.bind(this, item)
        //           } )
        //         }
        //       )
        //   ),
        // React.createElement
        //   (
        //     'button', { key: 'fruit-button', onClick: this.addItemHandler.bind(this) }, 'Add Fruit  '
        //   ),
        React.createElement
          (
            UnsplashSearcher, { key: 'unsplash-component' }
          )
      ]
    )
  }
}

ReactDOM.render(
  React.createElement(List),
  document.querySelector('#fruit-list')
)