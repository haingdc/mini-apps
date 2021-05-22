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

var eventsByDay = [
  {
    id: 'Monday',
    events: [
      {
        id: 'ATVPBWQIWR',
        title: 'Tod 1',
        hour: '12:15'
      },
    ],
  },
  {
    id: 'Tuesday',
  },
  {
    id: 'Wednesday',
  },
  {
    id: 'Thursday',
  },
  {
    id: 'Friday',
  },
  {
    id: 'Saturday',
  },
  {
    id: 'Sunday',
  },
]
function Section2() {
  const  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const hours = ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 AM', '13 AM', '14 AM', '15 AM', '16 AM', '17 AM', '18 AM', '19 AM', '20 AM', '21 AM', '22 AM', '23 AM', '24 AM']
  const numbs = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]
  return (
    e('div', { className: 'mother' },
      e(
        'div',
        { key: 'todo' , id: 'todo'},
        e(
          'div',
          {},
          [
            e('div', { key: 'gmt', className: 'hour' }, 'GMT+7'),
            hours.map(function renderHour(h) {
              return e(
                'div',
                { key: h, className: 'hour cell--14' },
                e('span', undefined, h)
              )
            })
          ]
        )
      ),
      e('div', { key: 'table', className: 'table' },
        [
          e('div', { key: 'horizontal lines', className: 'horizontal-lines'  },
            numbs.map(function(n, id) {
              return e('div', { key: `horizontal-line-${id}`, className: 'horizontal-line' }, )
            })
          ),
          e('div', { key: 'lefty vertical line', className: 'vertical-line vertical-line--lefty' }),
          [
            // e('div', { key: 'gmt', className : 'vertical-line-freeze' }, 'GMT+7'),
            eventsByDay.map(function renderColumns(day) {
              return e(
                'div',
                { key: day.id, className: 'vertical-line' },
                [
                  e('div', { key: `${day.id}-header`, className: 'cell--header' }, day.id),
                  // đặt các hình chữ nhật thông tin ở đây
                  day?.events?.length ?  e('div', { key: day.events[0], style: {
                    position: 'absolute',
                    top: '230px',
                    left: 0,
                    right: 0,
                    width: '80%',
                    background: 'lightblue',
                    margin: '0 auto',
                    zIndex: 3,
                  } }, day.events[0].title) : undefined,
                ]
              )
            })
          ]
        ]
      )
    )
  )
}

export default Main

function Event() {
  return 'Event'
}