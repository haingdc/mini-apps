import Dropdown from '../../components/dropdown/index.js'
import { e } from '../../utils/index.js'

function Header() {
  return (
    e('header', { className: 'app-header' },
      [
        e('img', { key: 'left', src: './assets/images/logo.svg' }),
        e('div', { key: 'right', className: 'right-header' },
          [
            e('img', { key: 'bell', className: 'app__notification', src: './assets/images/notification.svg' }),
            e(Dropdown, { key: 'profile dropdown' },
              [
                e('div', { key: 'profile container', className: 'profile-container' }, [
                  e('img', { key: 'left', src: './assets/images/avatar.png' }),
                  'Adam Fisherman',
                ]),
              ]
            ),
          ]
        ),
      ]
    )
  )
}

export default Header