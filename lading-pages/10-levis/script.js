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

  // TweenMax.from(".categories", 1, {
  //   delay: 1.4,
  //   opacity: 0,
  //   x: -150,
  //   ease: Expo.easeInOut
  // });

  // TweenMax.from(".search", .8, {
  //   delay: 1.6,
  //   opacity: 0,
  //   x: -20,
  //   ease: Expo.easeInOut
  // });

  // TweenMax.from(".bag", 1, {
  //   delay: 1.6,
  //   opacity: 0,
  //   x: -20,
  //   ease: Expo.easeInOut
  // });

  // TweenMax.staggerFrom(".media ul li", 1, {
  //   delay: 2,
  //   opacity: 0,
  //   x: -20,
  //   ease: Power3.easeInOut
  // }, 0.08);

  // TweenMax.from(".size", 1, {
  //   delay: 1.8,
  //   opacity: 0,
  //   x: -20,
  //   ease: Expo.easeInOut
  // });

  // TweenMax.staggerFrom(".size ul li", .3, {
  //   delay: 2,
  //   opacity: 0,
  //   y: 20,
  //   ease: Power3.easeInOut
  // }, 0.08);

  // TweenMax.staggerFrom(".dot", 1, {
  //   delay: 2.4,
  //   opacity: 0,
  //   x: 20,
  //   ease: Power3.easeInOut
  // }, 0.08);

  // TweenMax.from(".bottomnav", 1, {
  //   delay: 2.4,
  //   opacity: 0,
  //   x: -20,
  //   ease: Expo.easeInOut
  // });

  // TweenMax.from(".bottomnav ul li:first-child", .5, {
  //   delay: 2.4,
  //   opacity: 0,
  //   x: -20,
  //   ease: Expo.easeInOut
  // });

  // TweenMax.from(".bottomnav ul li:last-child", .6, {
  //   delay: 2.4,
  //   opacity: 0,
  //   x: -20,
  //   ease: Expo.easeInOut
  // });

  // TweenMax.from(".product-img", 3, {
  //   delay: 2,
  //   opacity: 0,
  //   y: 20,
  //   ease: Expo.easeInOut
  // });

  // TweenMax.from(".product-title", 3, {
  //   delay: 2.2,
  //   opacity: 0,
  //   y: 50,
  //   ease: Expo.easeInOut
  // });

  // TweenMax.from(".product-subtitle", 3, {
  //   delay: 2.4,
  //   opacity: 0,
  //   y: 50,
  //   ease: Expo.easeInOut
  // });
}


animate();

var clicks = rxjs.fromEvent(document, 'click');
clicks.subscribe(animate);
