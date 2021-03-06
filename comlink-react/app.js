import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";

function App() {
  var [  number1, setNumber1  ] = React.useState(0);
  var [  number2, setNumber2  ] = React.useState(0);
  var        totalListRef       = React.useRef([]);

  var total = useTakeALongTimeToAddTwoNumbers(number1, number2);

  // an total value will push to the list if both conditions match:
  // condition 1: total must be calculated
  // condition 2: list is empty Or to avoid duplicate total value is pushed to list due to useState, we need to compare last item and total
  if (               !total.isCalculating && total.total != undefined                   // condition 1
                                          &&
    (!totalListRef.current.length || totalListRef.current.at(-1) != total)  // condition 2
  ) {
    totalListRef.current = [...totalListRef.current, total];
  }

  return React.createElement
  (
    'div', { className: 'app' },
    React.createElement('h1', undefined, "Web Workers in action!"),
    React.createElement('div', undefined,
      React.createElement('label', undefined, 'Number to add:'),
      React.createElement(
        'input',
        {
          type: 'number',
          value: number1,
          onChange: function(e) {
            setNumber1(Number.parseInt(e.target.value, 10));
          },
        }
      )
    ),
    React.createElement('div', undefined,
      React.createElement('label', undefined, 'Number to add:'),
      React.createElement(
        'input',
        {
          type: 'number',
          value: number2,
          onChange: function(e) {
            setNumber2(Number.parseInt(e.target.value, 10));
          },
        }
      )
    ),
    React.createElement('h2', undefined,
      total.isCalculating ? React.createElement('em', undefined, 'Calculating...') : React.createElement('strong', undefined, total.total)
    ),
    React.createElement('div', undefined,
      totalListRef.current.map(function getTotalElement(e, i) {
        return React.createElement('div', { key: i }, `Total: ${e.total}`)
      }),
    ),
  )
}

ReactDOM.render(
  React.createElement(App),
  document.querySelector('#fruit-list')
)

function useTakeALongTimeToAddTwoNumbers(number1, number2) {
  var    controller   = React.useRef(null);
  var [data, setData] = React.useState({ isCalculating: false, total: undefined });
  var { workerApi } = useWorker()

  React.useEffect(
    function calculate() {
      // abort any previous instance of this
      if (controller.current)  controller.current.abort();

      try {
        var { signal } = (controller.current = new AbortController());

        setData({ isCalculating: true, total: undefined });

        abortable(signal, workerApi.takeALongTimeToAddTwoNumbers(number1,number2))
          .then(function updateTotal(total) {
            setData({ isCalculating: false, total });
          })
          .catch(err => {
            console.error(`👻 abortable error: ${err}`);
          });
      } catch(err) {
        console.error(`error: ${err}`);
      }


    },
    [workerApi, setData, number1, number2]
  );

  return data;
}

function useWorker() {
  // memoise a worker so it can be reused; create one worker up front
  // and then reuse it subsequently; no creating new workers each time
  var workerApiAndCleanup = React.useMemo(makeWorkerApiAndCleanup, []);
  React.useEffect(
    function() {
      var { cleanup } = workerApiAndCleanup;
      return cleanup;
    },
    [workerApiAndCleanup]
  );
  return workerApiAndCleanup;
}

function makeWorkerApiAndCleanup() {
  var worker = new Worker("./worker.js", {
    name: "my-first-worker",
    type: "module"
  });
  var workerApi = Comlink.wrap(worker);
  function cleanup() {
    workerApi[Comlink.releaseProxy]();
    worker.terminate();
  }
  return { workerApi, cleanup };
}