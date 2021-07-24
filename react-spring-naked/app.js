var NUM_TRANS = [
  {
    id: '7f515601-675a-4fdc-995a-796f41421383',
    fig: 0,
    op: {
      range: [0.75, 1],
      output: [0, 1]
    },
    trans: {
      range: [0.75, 1],
      output: [-40, 0],
      extrapolate: "clamp"
    }
  },
  {
    id: '39538eec-8be1-4d59-b199-81148a8dd804',
    fig: 1,
    op: {
      range: [ 0.25, 0.5 ],
      output: [ 0, 1 ]
    },
    trans: {
      range: [ 0.25, 0.5 ],
      output: [ -40, 0 ],
      extrapolate: "clamp"
    }
  },
  {
    id: '9540c6a3-9603-4da3-a19d-7fac5a3ef754',
    fig: 2,
    op: {
      range: [ 0, 0.25 ],
      output: [ 0, 1 ]
    },
    trans: {
      range: [ 0, 0.25 ],
      output: [ -40, 0 ],
      extrapolate: "clamp"
    }
  },
  {
    id: 'dd1d70c5-88f9-4cf0-88e9-303b14be9db6',
    fig: 3,
    op: {
      range: [ 0.5, 0.75 ],
      output: [ 0, 1 ]
    },
    trans: {
      range: [ 0.5, 0.75 ],
      output: [ -40, 0 ],
      extrapolate: "clamp"
    }
  }
];
function App() {
  var [items, setItems] = React.useState(NUM_TRANS)
  var transitions = ReactSpring.useTransition(items, {
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
      }, 20000);
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
          key: item.id,
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
  )
}
ReactDOM.render(
  React.createElement(App),
  document.querySelector('#fruit-list')
)