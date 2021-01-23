function animate() {
  TweenMax.from('.logo', 1, {
    delay: 1.2,
    opacity: 0,
    x: -20,
    ease: Expo.easeInOut
  })
  
  TweenMax.staggerFrom('.menu-links ul li', 1, {
    delay: 1.2,
    opacity: 0,
    x: -20,
    ease: Power4.easeInOut
  }, 0.08)

  TweenMax.from('.search', 1, {
    delay: 1.6,
    opacity: 0,
    x: -20,
    ease: Expo.easeInOut
  })

  TweenMax.from('.cart', 1, {
    delay: 1.8,
    opacity: 0,
    x: -20,
    ease: Expo.easeInOut
  })

  TweenMax.fromTo('.first', {
    x: 0,
  }, {
    duration: 1.5,
    delay: .2,
    x: '-100%',
    ease: Expo.easeInOut
  })


  TweenMax.fromTo('.second', {
    x: 0,
  }, {
    duration: 1.5,
    delay: .4,
    x: '-100%',
    ease: Expo.easeInOut
  })

  TweenMax.fromTo('.third', {
    x: 0,
  }, {
    duration: 1.5,
    delay: .6,
    x: '-100%',
    ease: Expo.easeInOut
  })
}



var clicks = rxjs.fromEvent(document, 'click');
clicks.subscribe(animate);

animate();