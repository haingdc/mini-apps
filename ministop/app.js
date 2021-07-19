class Item {
  constructor(form) {
    this.id       = R.path([  'name'  ], form) || '';
    this.img      = R.path([  'img'   ], form) || '';
    if (this.img) {
      this.img = 'assets/images/' + this.img;
    }
    this.name     = R.path([  'name'  ], form) || '';
    this.quantity = R.path(['quantity'], form) || '';
  }

  equals(a) {
    return a.id == this.id;
  }
}

var initialItems = [
  { quantity: 1, name: 'terong'    , img: 'terong.png'     },
  { quantity: 1, name: 'apple'     , img: 'apple.png'      },
  { quantity: 1, name: 'jeruk'     , img: 'jeruk.png'      },
  { quantity: 1, name: 'lemon'     , img: 'lemon.png'      },
  { quantity: 1, name: 'melon'     , img: 'melon.png'      },
  { quantity: 1, name: 'pisang'    , img: 'pisang.png'     },
  { quantity: 1, name: 'semangka'  , img: 'semangka.png'   },
  { quantity: 1, name: 'strawberry', img: 'strawberry.png' },
];

var items = R.map(n => new Item(n), initialItems);

function App() {
  var [selected, setSelected] = React.useState([]);
  var now = moment().format('ddd, DD MMM YYYY, HH:MM A');
  return React.createElement
  (
    'div', { className: 'pos' },
    React.createElement('div', { className: 'pos__header' },
      React.createElement('div', { className: 'pos__header__info' },
        React.createElement('div', { className: 'order-number' }, 'Order No. #005'),
        React.createElement('div', { className: '' }, now)
      )
    ),
    React.createElement('div', { className: 'pos__input' },
      React.createElement('input', { type: 'text', placeholder: 'Enter item code..' })
    ),
    React.createElement('div', { className: 'pos__cart' },
      React.createElement('div', { className: 'pos__cart__header' },
        React.createElement('div', { className: 'pos__cart__head' }, 'Cart'),
        React.createElement('div', { className: 'pos__cart__close' }, 'X'),
      ),
      React.createElement('div', { className: 'pos__cart__header-shadow' }),
      React.createElement('div', { className: 'pos__cart__list-wrapper' },
        React.createElement('div', { className: 'pos__cart__list' },
          [] // todo
        ),
      ),
      React.createElement('div', { className: 'pos__cart__sumup-wrapper' },
        React.createElement('div', { className: 'pos__cart__sumup' },
          React.createElement('div', { className: 'pos__cart__sumup__name' }, 'Sub Total'),
          React.createElement('div', { className: 'pos__cart__sumup__value' }, '$43'),
          React.createElement('div', { className: 'pos__cart__sumup__name' }, 'Tax'),
          React.createElement('div', { className: 'pos__cart__sumup__value' }, '$2')
        ),
      ),
      React.createElement('div', { className: 'pos__cart__actions' },
        React.createElement('div', { className: 'pos__cart__sumup' },
          React.createElement('div', { className: 'pos__cart__sumup__name pos__cart__sumup__name--bigger' }, 'Total'),
          React.createElement('div', { className: 'pos__cart__sumup__value pos__cart__sumup__value--bigger' }, '$45')
        ),
        React.createElement('div', { className: 'pos__cart__check-out-wrapper' },
          React.createElement('button', { className: 'pos__cart__actions__button pos__cart__check-out' }, 'Check out')
        ),
        React.createElement('div', { className: 'pos__cart__pending-wrapper' },
          React.createElement('button', { className: 'pos__cart__actions__button pos__cart__pending' }, 'Pending')
        ),
      ),
    ),
    React.createElement('div', { className: 'pos__list' },
      items.map(item => {
        return React.createElement(
          'div',
          {
            key: item.id,
            className: 'pos__item',
            onClick() {
              setSelected(list => {
                var [existItem] = list.filter(n => n.equals(item))
                if (existItem) {
                  existItem.quantity += 1;
                  return [...list];
                }
                return [...list, item];
              });
            },
          },
          React.createElement('img', { src: item.img }),
          React.createElement('div', { className: 'pos__item__name' }, item.name)
        );
      })
    ),
    React.createElement('div', { className: 'pos__categories' },
      React.createElement('div', { className: 'pos__categories__container' },
        React.createElement('div', { className: 'pos__categories__item' },
          React.createElement('img', { className: 'pos__categories__item__photo', src: 'assets/images/vegetables.png' }),
          React.createElement('div', { className: 'pos__categories__item__name' }, 'Vegetables')
        ),
        React.createElement('div', { className: 'pos__categories__item active' },
          React.createElement('img', { className: 'pos__categories__item__photo', src: 'assets/images/fruits.png' }),
          React.createElement('div', { className: 'pos__categories__item__name' }, 'Fresh Fruit')
        ),
        React.createElement('div', { className: 'pos__categories__item' },
          React.createElement('img', { className: 'pos__categories__item__photo', src: 'assets/images/cabonhydrate.png' }),
          React.createElement('div', { className: 'pos__categories__item__name' }, 'Carbohydrate')
        ),
      ),
      React.createElement('div', { className: 'pos__categories__dots' }, '...'),
    ),
  )
}
ReactDOM.render(
  React.createElement(App),
  document.querySelector('#fruit-list')
)