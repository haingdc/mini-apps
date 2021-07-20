import useHeight from './useHeight.js'
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
// get first four items
var initialSelected = items.slice(0, 4);

function App() {
  var [    selected, setSelected    ] = React.useState(initialSelected);
  var [displaySizes, setDisplaySizes] = React.useState({});
  var now = moment().format('ddd, DD MMM YYYY, HH:MM A');

  var setDisplaySize = React.useCallback(
    function(id, height) {
      setDisplaySizes(prev => ({ ...prev, [id]: height }));
    },
    [setDisplaySizes]
  );

  var selectedMap = React.useMemo(
    function() {
      return selected.reduce((hash, item) => (hash[item.id], hash), {})
    },
    [selected]
  );
  var selectedTransitions = ReactSpring.useTransition(selected, {
    from: { opacity: 0, transform: "translate3d(-25%, 0px, 0px)" },
    delay: 200,
    config(item) {
      console.log('config');
      return {
        ...ReactSpring.config.stiff,
        clamp: !selectedMap[item.id],
      };
    },
    enter(item) {
      console.log('enter');
      return {
        opacity: 1,
        height: displaySizes[item.id],
        transform: "translate3d(0%, 0px, 0px)"
      };
    },
    update(item) {
      console.log('update');
      return { height: displaySizes[item.id] };
    },
    leave: { opacity: 0, height: 0, transform: "translate3d(25%, 0px, 0px)" }
  });

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
          selectedTransitions(function(styles, item) {
            var { quantity, img: src} = item;

            return React.createElement(CartItem, {
              price : "$15",
              src,
              item,
              styles ,
              quantity,
              setDisplaySize,
              onUpdateQuantity,
              onRemove,
            });

            function onUpdateQuantity(quantity) {
              setSelected(function(list) {
                var [existItem] = list.filter(n => n.equals(item));
                existItem.quantity = quantity;
                return [...list];
              });
            }
            function onRemove() {
              setSelected(function(list) {
                var others = list.filter(n => !n.equals(item));
                return others;
              });
            }
          })
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

function CartItem(props) {
  var {
    src, price, quantity, children, styles, setDisplaySize, item,
    onUpdateQuantity,
    onRemove,
  } = props;

  var [ref, height] = useHeight();
  React.useLayoutEffect(function() {
    height && setDisplaySize(item.id, height);
  }, [height]);

  return React.createElement(
    ReactSpring.animated.div,
    {
      className: 'cart__item-wrapper',
      style: { ...styles, overflow: 'hidden' },
    },
    React.createElement('div', { ref, style: {marginRight: '10px'} },
      React.createElement('div', { className: 'cart__item' },
        React.createElement('img', { className: 'cart__item__photo', src }),
        React.createElement('div', { className: 'cart__item__name', children }),
        React.createElement('div', { className: 'cart__item__price' }, price),
        React.createElement('div', { className: 'cart__item__quantity-wrapper' },
          React.createElement('div', { className: 'cart__item__quantity' },
            React.createElement('div', {
              className: 'cart__item__quantity__minus',
              onClick() {
                var newQuantity = quantity - 1;
                if (newQuantity > 0) {
                  onUpdateQuantity(quantity - 1);
                  return;
                }
                onRemove();
              },
            }, '-'),
            React.createElement('div', { className: 'cart__item__quantity__number' }, quantity),
            React.createElement('div', {
              className: 'cart__item__quantity__plus',
              onClick() {
                onUpdateQuantity(quantity + 1);
              },
            }, '+')
          )
        )
      )
    )
  );
}

function lazyTask() {
  var count = 0;
  var a = new Date();
  while((new Date()).getTime() - a.getTime() < 1100) {
    // wait
    count += 1;
  }
}

ReactDOM.render(
  React.createElement(App),
  document.querySelector('#fruit-list')
);