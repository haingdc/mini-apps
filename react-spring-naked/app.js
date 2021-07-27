var NUM_TRANS = [
  {
    id: undefined,
    fig: 0,
    op: {
      range: [0.75, 1],
      output: [0, 1]
    },
    trans: {
      range: [0.75, 1],
      output: [40, 0],
      extrapolate: "clamp"
    }
  },
  {
    id: undefined,
    fig: 1,
    op: {
      range: [ 0.25, 0.5 ],
      output: [ 0, 1 ]
    },
    trans: {
      range: [ 0.25, 0.5 ],
      output: [ 40, 0 ],
      extrapolate: "clamp"
    }
  },
  {
    id: undefined,
    fig: 2,
    op: {
      range: [ 0, 0.25 ],
      output: [ 0, 1 ]
    },
    trans: {
      range: [ 0, 0.25 ],
      output: [ 40, 0 ],
      extrapolate: "clamp"
    }
  },
  {
    id: undefined,
    fig: 3,
    op: {
      range: [ 0.5, 0.75 ],
      output: [ 0, 1 ]
    },
    trans: {
      range: [ 0.5, 0.75 ],
      output: [ 40, 0 ],
      extrapolate: "clamp"
    }
  }
];

NUM_TRANS = NUM_TRANS.map(num => ({ ...num, id: uuid.v4() }));
function App() {
  var columns = useMedia(['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'], [5, 4, 3], 2);

  var [items, setItems] = React.useState(NUM_TRANS)
  var transitions = ReactSpring.useTransition(items, {
    keys(item) {
      return item.id;
    },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 200,
    config: ReactSpring.config.molasses,
    onRest() {
      setItems([]);
    },
  });

  React.useEffect(function reset() {
    if (items.length == 0) {
      setTimeout(() => {
        setItems(NUM_TRANS)
      }, 2000);
    }
  }, [items]);

  return React.createElement('div',
    {
      style: {
        display: 'flex',
      },
    },
    // for more details about transition function, reference to
    // https://react-spring.io/hooks/use-transition#mountunmount-single-component-reveals
    transitions(function animate(animatedValue, item, TransitionObj, SiblingPosition) {
      var { opacity } = animatedValue;
      return React.createElement(ReactSpring.animated.div,
        {
          style: {
            opacity: opacity.to(item.op),
            transform: opacity
              .to(item.trans)
              .to(function(y) {
                return `translate3d(0,${y}px,0)`;
              }),
          },
        },
        item.fig
      )
    })
  );
}

/**
 * 
 * @param {string[]} queries
 * @param {number[]} values
 * @param {number} defaultValue
 */
function useMedia(queries, values, defaultValue) {
  var [value, set] = React.useState(match);

  React.useEffect(function () {
    window.addEventListener('resize', handler);

    return function free() {
      return window.removeEventListener('resize', handler);
    };

    function handler() {
      return set(match);
    }
  }, []);

  return value;

  function match() {
    var i = queries.findIndex(q => matchMedia(q).matches);
    return values[i] || defaultValue;
  }
}

ReactDOM.render(
  React.createElement(App),
  document.querySelector('#fruit-list')
)