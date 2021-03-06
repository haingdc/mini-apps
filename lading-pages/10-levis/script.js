function animate() {
  TweenMax.fromTo(".left", {
    width: 0,
  }, {
    duration: 1.6,
    delay: 0.6,
    width: '50%',
    ease: Expo.easeInOut
  })

  TweenMax.fromTo(".right", {
    width: 0,
  }, {
    duration: 1.6,
    delay: 0.6,
    width: '50%',
    ease: Expo.easeInOut
  })

  TweenMax.fromTo(".logo", {
    opacity: 0,
    x: -20,
  }, {
    duration: 1,
    delay: 1,
    opacity: 1,
    x: 0,
    ease: Expo.easeInOut
  })

  TweenMax.fromTo(".menu", {
    opacity: 0,
    x: -20
  }, {
    duration: 1,
    delay: 1.2,
    opacity: 1,
    x: 0,
    ease: Expo.easeInOut
  });

  TweenMax.fromTo(".categories", {
    opacity: 0,
    x: -150,
  }, {
    duration: 1,
    delay: 1.4,
    opacity: 1,
    x: 0,
    ease: Expo.easeInOut
  });

  TweenMax.fromTo(".search", {
    opacity: 0,
    x: -20,
  }, {
    duration: .8,
    delay: 1.6,
    opacity: 1,
    x: 0,
    ease: Expo.easeInOut
  });

  TweenMax.fromTo(".bag", {
    opacity: 0,
    x: -20,
  }, {
    duration: 1,
    delay: 1.6,
    opacity: 1,
    x: 0,
    ease: Expo.easeInOut
  });

  TweenMax.staggerFromTo(".media ul li", 1, {
    opacity: 0,
    x: -20,
  }, {
    delay: 2,
    opacity: 1,
    x: 0,
    ease: Power3.easeInOut
  }, 0.08);

  TweenMax.fromTo(".size", {
    opacity: 0,
    x: -20,
  }, {
    duration: 1,
    delay: 1.8,
    opacity: 1,
    x: 0,
    ease: Expo.easeInOut
  });

  TweenMax.staggerFromTo(".size ul li", .3, {
    opacity: 0,
    y: 20,
  }, {
    delay: 2,
    opacity: 1,
    y: 0,
    ease: Power3.easeInOut
  }, 0.08);

  TweenMax.staggerFromTo(".dot", 1, {
    opacity: 0,
    x: 20,
  }, {
    delay: 2.4,
    opacity: 1,
    x: 0,
    ease: Power3.easeInOut
  }, 0.08);

  TweenMax.fromTo(".bottomnav", {
    opacity: 0,
    x: -20,
  }, {
    duration: 1,
    delay: 2.4,
    opacity: 1,
    x: 0,
    ease: Expo.easeInOut
  });

  TweenMax.fromTo(".bottomnav ul li:first-child", {
    opacity: 0,
    x: -20,
  }, {
    duration: .5,
    delay: 2.4,
    opacity: 1,
    x: 0,
    ease: Expo.easeInOut
  });

  TweenMax.fromTo;(".bottomnav ul li:last-child", {
    opacity: 0,
    x: -20,
  }, {
    duration: .6,
    delay: 2.4,
    opacity: 1,
    x: 0,
    ease: Expo.easeInOut
  });

  TweenMax.fromTo(".product-img", {
    opacity: 0,
    y: 20,
  }, {
    duration: 3,
    delay: 2,
    opacity: 1,
    y: 0,
    ease: Expo.easeInOut
  });

  TweenMax.fromTo(".product-title", {
    opacity: 0,
    y: 50,
  }, {
    duration: 3,
    delay: 2.2,
    opacity: 1,
    y: 0,
    ease: Expo.easeInOut
  });

  TweenMax.fromTo(".product-subtitle", {
    opacity: 0,
    y: 50,
  }, {
    duration: 3,
    delay: 2.4,
    opacity: 1,
    y: 0,
    ease: Expo.easeInOut
  });
}


animate();

var clicks = rxjs.fromEvent(document, 'click');
clicks.subscribe(animate);
