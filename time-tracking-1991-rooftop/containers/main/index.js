import { e, toMoment, getEvent } from '../../utils/index.js'

const helloPromise = import('../../components/hello/index.js')
const Hello = React.lazy(() => helloPromise)

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
  var [isActive, setIsActive] = React.useState(false)
  return e(
    'div',
    undefined,
    [
      e(
        'button',
        {
          key: 'button',
          onClick: function showModal() {
            setIsActive(true)
          },
        },
        'Open modal'
      ),
      e(
        'div', { key: 'modal', className: classNames('modal', { 'is-active': isActive }) },
        e('div'   , { className: 'modal-background' }),
        e(
          'div'   ,
          { className: 'modal-content' },
          isActive ?
            e('div', { className: 'box' },
              e(
                React.Suspense ,
                { fallback: e('div', undefined, 'Loading...') },
                e(Hello)
              )
            )
            : undefined
        ),
        e(
          'button',
          {
            className: 'modal-close is-large',
            ['aria-label']: 'close',
            onClick: function hideModal() {
              setIsActive(false)
            },
          }),
      )
    ]
  )
}



var eventsByDay = [
  {
    id: 'Monday',
    // events: [
    //   {
    //     id: 'ATVPBWQIWR',
    //     title: 'Tod 1',
    //     hour: '12:15',
    //     color: 'blue',
    //     top: 230,
    //     height: 50,
    //   },
    //   {
    //     id: 'VAOJCSSKCT',
    //     title: 'Coding phase',
    //     hour: '13:45',
    //     color: 'red',
    //     top: 330,
    //     height: 80,
    //   },
    // ],
    events: [toMoment(), toMoment()]
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
  var hours = ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 AM', '13 AM', '14 AM', '15 AM', '16 AM', '17 AM', '18 AM', '19 AM', '20 AM', '21 AM', '22 AM', '23 AM', '24 AM']
  var numbs = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]
  var [days, setDays] = React.useState([
    { id: 'Monday'   , events: [] },
    { id: 'Tuesday'  , events: [] },
    { id: 'Wednesday', events: [] },
    { id: 'Thursday' , events: [] },
    { id: 'Friday'   , events: [] },
    { id: 'Saturday' , events: [] },
    { id: 'Sunday'   , events: [] },
  ])

  React.useEffect(function loadEvents() {
    var getEvents = R.pipe(
      R.range(0),
      R.map(getEvent),
      Promise.all.bind(Promise)
    )

    getEvents(/* random x events */ 5)
      .then(events => {
        var [ev1, ev2,ev3,ev4,ev5] = events
        setDays([
          { id: 'Monday'   , events: [ev1, ev2] },
          { id: 'Tuesday'  , events: [] },
          { id: 'Wednesday', events: [] },
          { id: 'Thursday' , events: [ev3] },
          { id: 'Friday'   , events: [] },
          { id: 'Saturday' , events: [ev4, ev5] },
          { id: 'Sunday'   , events: [] },
        ])
      })

  }, [])
  return (
    e('div', { className: 'scheduler' },
      [
        e(
          'div',
          { key: 'hour columns', className: 'column--hour' },
          e(
            'div',
            {},
            [
              e('div', { key: 'gmt', className: 'cell--hour' }, 'GMT+7'),
              hours.map(function renderHour(h) {
                return e(
                  'div',
                  { key: h, className: 'cell--hour cell--14' },
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
            e('div', { key: 'todo-line', className: 'todo-line' }, ),
            e('div', { key: 'lefty vertical line', className: 'vertical-line vertical-line--lefty' }),
            [
              days.map(function renderColumns(day) {
                return e(
                  'div',
                  { key: day.id, className: 'vertical-line' },
                  [
                    e('div', { key: `${day.id}-header`, className: 'cell--header' }, day.id),
                    day?.events?.length
                      ? day.events.map(function renderEvent(event) {
                          return e(
                            Event,
                            {
                              color : event.color,
                              height: event.height,
                              key   : event.id,
                              top   : event.top,
                            },
                            event.title
                          )
                        })
                      : undefined
                  ]
                )
              })
            ]
          ]
        )
      ]
    )
  )
}

export default Main

function Event(props) {
  var { top, height } = props
  const bgrColorLookup = {
    red   : '#FF7976',
    blue  : '#538FFF',
    yellow: '#FEC25A',
  }
  var backgroundColor = bgrColorLookup[props.color] || bgrColorLookup.blue
  return e(
    'div',
    {
      style: {
        zIndex         : 3,
        left           : 0,
        right          : 0,
        top            : top + 'px',
        width          : '80%',
        margin         : '0 auto',
        position       : 'absolute',
        height         : height + 'px',
        color          : '#fff',
        padding        : '7px',
        borderRadius   : 3,
        backgroundColor: backgroundColor,
      }
    },
    props.children
  )
}

function SillyEvent() {
  var content = 'Basgram - code review'
  var hour  = '08:12'
  var code  = 'PR611'
  return e(
    'div',
    {  },
    [
      e('div', { key: 'head', },
        [
          // title
          e('span', { key: 'hour' }, hour),
          // code
          e('span', { key: 'code' }, code),
        ]
      ),
      e('div', { key: 'content' }, content),
    ]
  )
}