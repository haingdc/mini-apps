import {e} from '../../utils/index.js'

function Dropdown(props) {
  var { children } = props
  return (
    e('div', { key: 'dropdown', className: 'dropdown' },
      [
        children,
        e('img', { key: 'chevron down', className: 'dropdown--chevron', src: './assets/images/chevron-down.svg' }),
      ]
    )
  )
}

export default Dropdown