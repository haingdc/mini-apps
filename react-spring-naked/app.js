import { debounce } from './libraries-esmodule/debounce@1.2.1.js'
import useMeasure from './libraries-esmodule/react-use-measure@2.0.4-web.js';


function getOutput() {
  var ns = [100, 200, 300, 25, 20];
  var i = Math.floor(Math.random()*ns.length);
  var n = ns[i];
  return [n, 0];
}

function getRange() {
  var ns = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75];
  var i = Math.floor(Math.random()*14);
  var n = ns[i];
  return [n, n+0.25];
}

function getNUM_TRANS(len) {
  var ns = R.range(0, len);
  return ns.map(function getNum(n) {
    var range = getRange();
    return {
      id: uuid.v4(),
      fig: n,
      op: { range, output: [0,1] },
      trans: { range, output: getOutput(), extrapolate: "clamp" },
    };
  });
}
var NUM_TRANS = getNUM_TRANS(10);


NUM_TRANS = NUM_TRANS.map(num => ({ ...num, id: uuid.v4() }));
function App() {
  var columns = useMedia(['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'], [5, 4, 3], 2);
  const [ref, bounds] = useMeasure()

  React.useEffect(function testMeasure() {
    console.log(bounds);
  }, []);

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
      ref,
      className: 'todo',
      style: {
        display: 'flex',
      },
    },
    React.createElement('input', {
      onChange: debounce(function (evt) {
        console.log(evt.target.value);
      }, 200),
    }),
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
    }),
    React.createElement('button', { type: 'button', onClick() {
      console.log(bounds);
    } }, 'measure')
  );
}

/**
 * The hook try matching one of the queries to the corresponding value
 * or fallback to defaultValue.
 *
 * @param {string[]} queries
 * @param {number[]} values
 * @param {number} defaultValue
 * @returns {number}
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