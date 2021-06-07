importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");

Comlink.expose({ takeALongTimeToAddTwoNumbers });

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