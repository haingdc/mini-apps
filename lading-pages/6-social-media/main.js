function animate() {
  anime({
    targets: '.nav .icon i',
    translateX: [100, 0],
    duration: 1200,
    opacity: [0, 1],
    delay: (el, i) => {
      return 300 + 100 * i;
    },
  })

  anime({
    targets: '.nav .icon p',
    duration: 1200,
    opacity: [0, 1],
    delay: 700
  })


}

animate();

var clicks = rxjs.fromEvent(document, 'click');
clicks.subscribe(animate);