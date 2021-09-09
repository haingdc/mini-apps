import ClickOutsideDetector from './components/behaviors/click-outside-detector/index.js'

function App() {
  const [ text, setText ] = React.useState(null);
  return React.createElement
  (
    ClickOutsideDetector,
    {
      listen: true,
      onClickOutside: () => {
        setText('clicked outside')
      },
      onClick: () => {
        setText('clicked inside')
      }
    },
    React.createElement
    (
      'h1', null,
      text ? text : "Click inside or outside me."
    )
  )
}
ReactDOM.render(
  React.createElement(App),
  document.querySelector('#fruit-list')
)