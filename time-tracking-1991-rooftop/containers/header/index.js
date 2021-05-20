import Dropdown from '../../components/profile-dropdown/index.js'
import { e } from '../../utils/index.js'

function Header() {
  return (
    e('header', undefined,
      [
        e('img', { key: 'left', src: './assets/images/logo.svg' }),
        e('div', { key: 'right' },
          [
            e('img', { key: 'bell', src: './assets/images/notification.svg' }),
            e(Dropdown, { key: 'profile dropdown' }, 'Adam Fisherman'),
            // e('div', { key: 'profile-container' }, [
            //   e('img', { key: 'left', src: './assets/images/avatar.png' }),
            // ]),
          ]
        ),
      ]
    )
  )
}

export default Header