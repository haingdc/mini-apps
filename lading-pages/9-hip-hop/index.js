

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



TweenMax.to('.first', 1.5, {
  delay: .2,
  x: '-100%',
  ease: Expo.easeInOut
})

TweenMax.to('.second', 1.5, {
  delay: .4,
  x: '-100%',
  ease: Expo.easeInOut
})

TweenMax.to('.third', 1.5, {
  delay: .6,
  x: '-100%',
  ease: Expo.easeInOut
})

