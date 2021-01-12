function animate() {
  TweenMax.fromTo(".overlay h1", {
    opacity: 1,
    y: 0,
  }, {
    duration: 2,
    opacity: 0,
    y: -60,
    ease: Expo.easeInOut
  })

  TweenMax.fromTo(".overlay span", {
    opacity: 1,
    y: 0,
  }, {
    duration: 2,
    delay: .3,
    opacity: 0,
    y: -60,
    ease: Expo.easeInOut
  })

  TweenMax.fromTo(".overlay", {
    top: 0,
  }, {
    duration: 2,
    delay: 1,
    top: "-100%",
    ease: Expo.easeInOut
  })

  TweenMax.fromTo(".ellipse-container", 1, {
    opacity: 0,
  }, {
    duration: 1,
    delay: 2,
    opacity: 1,
    ease: Expo.easeInOut
  })

  TweenMax.fromTo(".yellow", {
    opacity: 0,
  }, {
    duration: 1,
    delay: 3.5,
    opacity: 1,
    ease: Expo.easeInOut
  })

  TweenMax.from(".circle1", {
    opacity: 0,
  }, {
    duration: 1,
    delay: 2.4,
    opacity: 1,
    ease: Expo.easeInOut
  })

  TweenMax.from(".circle2", {
    opacity: 0,
  }, {
    duration: 1,
    delay: 2.6,
    opacity: 1,
    ease: Expo.easeInOut
  })

  TweenMax.fromTo(".logo", {
    opacity: 0,
  }, {
    duration: 1,
    delay: 3,
    opacity: 1,
    y: -100,
    ease: Expo.easeInOut
  })

  TweenMax.staggerFrom(".menu-links ul li", 1, {
    delay: 3.2,
    opacity: 0,
    x: -100,
    ease: Expo.easeInOut
  }, 0.08)

  TweenMax.from(".scrolldown", 1, {
    delay: 3.4,
    opacity: 0,
    y: 100,
    ease: Expo.easeInOut
  })

  TweenMax.from(".text .title", 1, {
    delay: 3,
    opacity: 0,
    x: 200,
    ease: Expo.easeInOut
  })

  TweenMax.from(".text p", 1, {
    delay: 3.2,
    opacity: 0,
    x: 200,
    ease: Expo.easeInOut
  })

  TweenMax.from(".watchnow", 1, {
    delay: 3.4,
    opacity: 0,
    x: 200,
    ease: Expo.easeInOut
  })

  TweenMax.staggerFrom(".media ul li", 1, {
    delay: 3,
    opacity: 0,
    y: 100,
    ease: Expo.easeInOut
  }, 0.08)
}

var clicks = rxjs.fromEvent(document, 'click');
clicks.subscribe(animate);

animate();