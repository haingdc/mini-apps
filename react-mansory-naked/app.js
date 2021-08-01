import { debounce } from './libraries-esmodule/debounce@1.2.1.js'
import useMeasure from './libraries-esmodule/react-use-measure@2.0.4-web.js';
import data from './data.js';

var { useState, useEffect } = React;

/**
 * @param {any[]} items
 * @param {any} item
 * @returns {number}
*/
var flip_indexOf = R.flip(R.indexOf);

var shuffler = R.curry(function(random, list) {
  var idx = -1;
  var len = list.length;
  var position;
  var result = [];
  while (++idx < len) {
      position = Math.floor((idx + 1) * random());
      result[idx] = result[position];
      result[position] = list[idx];
  }
  return result;
});

var shuffle = shuffler(Math.random);

function Mansory() {
  var columns = useMedia(['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'], [5,4,3], 2);
  var [ref, { width }] = useMeasure();
  var [items, set] = useState(data);

  // Hook4: shuffle data every 2 seconds
  // useEffect(function() {
  //   var t = setInterval(() => set(shuffle), 2000);
  //   return () => clearInterval(t);
  // }, []);

  var [heights, gridItems] = React.useMemo(function layout() {
    var heights = new Array(columns).fill(0);
    var gridItems = items.map(function mapper(child, i) {
      var column = R.pipe( Math.min, flip_indexOf(heights) )(...heights);
      var widthCol = width / columns;
      var heightHalf = child.height / 2;
      heights[column] += heightHalf; // add to a half

      var x = widthCol * column;
      var y = heights[column] - heightHalf;
      return { ...child, x, y, width: widthCol, height: heightHalf };
    });
    return [heights, gridItems];
  });

  var transitions = ReactSpring.useTransition(gridItems, {
    /**
     * @param {{ css: string; height: number }} item
     */
    key(item) {
      return item.css;
    },
    /**
     * @param {{ x: number; y: number; width: number; height: number }} item
     */
    from(item) {
      const { x, y, width, height } = item;
      return { x,y,width,height, opacity:0 };
    },
    /**
     * @param {{ x: number; y: number; width: number; height: number }} item
     */
    enter(item) {
      const { x, y, width, height } = item;
      return { x,y,width,height, opacity:1 };
    },
    /**
     * @param {{ x: number; y: number; width: number; height: number }} item
     */
    update(item) {
      const { x, y, width, height } = item;
      return { x,y,width,height };
    },
    leave: { height: 0, opacity: 0 },
    config: { mass: 5,tension:500, friction:100 },
    trail: 25
  });

  return React.createElement('div', { ref, className: 'list', style: { height: Math.max(...heights) }},
    transitions(function animate(animatedValue, item, TransitionObj, SiblingPosition) {
      return React.createElement(ReactSpring.a.div,
        {
          style: animatedValue,
          onClick: function remove() {
            set(items => {
              return items.filter(n => n.css != item.css);
            });
          },
        },
        React.createElement('div', { style: { backgroundImage: `url(${item.css}?auto=compress&dpr=2&h=500&w=500)` }})
      );
    })
  );
}

ReactDOM.render(
  React.createElement(Mansory),
  document.querySelector('#fruit-list')
)

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
