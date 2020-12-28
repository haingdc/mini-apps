var time = performance.now()

rxjs.fromEvent(document, 'click').subscribe(event => {
  var current = performance.now();
  console.log(`it took ${current - time} millisecond from the last click`);
  time = current;
});
