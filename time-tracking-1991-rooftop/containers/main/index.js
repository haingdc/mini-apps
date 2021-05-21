import { e } from '../../utils/index.js'

function Main() {
  return (
    e('div', undefined,
      [
        e(Section1 , { key: 'left'    }),
        e(Section2 , { key: 'right'   }),
      ]
    )
  )
}

function Section1() {
  return 'Left'
}
function Section2() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const hours = ['8 AM', '9 AM', '10 AM', '11 AM', '12 AM', '13 AM', '14 AM', '15 AM', '16 AM', '17 AM', '18 AM', '19 AM', '20 AM', '21 AM', '22 AM', '23 AM', '24 AM']
  const numbs = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
  return (
    e('div', undefined,
      e('div', { className: 'table' },
        [
          e('div', { key: 'horizontal lines', className: 'horizontal-lines'  },
            numbs.map(function(n, id) {
              return e('div', { key: `horizontal-line-${id}`, className: 'horizontal-line' }, )
            })
          ),
          e('div', { key: 'lefty vertical line', className: 'vertical-line vertical-line--lefty' }),
          [
            e('div', { key: 'gmt', className : 'vertical-line' }, 'GMT+7'),
            days.map(function renderColumns(day) {
              return e(
                'div',
                { key: day, className: 'vertical-line' },
                e('div', { className: 'cell--header' }, day)
                // đặt các hình chữ nhật thông tin ở đây
              )
            })
          ]
        ]
      )
    )
  )
}

export default Main