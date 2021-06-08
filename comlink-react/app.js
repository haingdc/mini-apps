import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";

function App() {
  var [number1, setNumber1] = React.useState(0);
  var [number2, setNumber2] = React.useState(0);

  var total = useTakeALongTimeToAddTwoNumbers(number1, number2);

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
  )
}

ReactDOM.render(
  React.createElement(App),
  document.querySelector('#fruit-list')
)

function useTakeALongTimeToAddTwoNumbers(number1, number2) {
  var [data, setData] = React.useState({ isCalculating: false, total: undefined });
  var { workerApi } = useWorker()

  React.useEffect(
    function calculate() {
      setData({ isCalculating: true, total: undefined });

      workerApi
        .takeALongTimeToAddTwoNumbers(number1, number2)
        .then(function updateTotal(total) {
          setData({ isCalculating: false, total });
        });
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