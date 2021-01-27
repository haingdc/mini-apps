TweenMax.staggerFromTo(".panel__item", 1, {
  opacity: 0,
  y: 20,
}, {
  delay: 0.3,
  opacity: 1,
  y: 0,
  ease: Power3.easeInOut
}, 0.08);