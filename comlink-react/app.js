function App() {
  var [number1, setNumber1] = React.useState(1);
  var [number2, setNumber2] = React.useState(2);

  var total = takeALongTimeToAddTwoNumbers(number1, number2);

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
    React.createElement('h2', undefined, `Total: ${total}`),
  )
}

ReactDOM.render(
  React.createElement(App),
  document.querySelector('#fruit-list')
)

function takeALongTimeToAddTwoNumbers(number1, number2) {
  console.log('Start to add...');
  const seconds = 5;
  const start = new Date().getTime();
  const delay = seconds * 1000;
  while (true) {
      if ((new Date().getTime() - start) > delay) {
          break;
      }
  }
  const total = number1 + number2;
  console.log('Finished adding');
  return total;
}
