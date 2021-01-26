var bb_tline;

function animDemo(elemId) {
  const elem = document.getElementById(elemId),
    elementWidth = elem.offsetWidth,
    elementHeight = elem.offsetHeight,
    leftWall = 0,     // containing box walls
    rightWall = elem.parentNode.clientWidth,
    topWall = 0,
    bottomWall = elem.parentNode.clientHeight,
    reflect = -1,     // bounce off wall else disappear
    coeff = 0.80,     // percentage bounce height
    friction = 0.98,  // rolling friction loss coeff
    px_mm = 2.0,      // 90dpi = 90px/25.4mm = 3.5 (slow it to 2)
    gravity = 0.0098 * px_mm; // gravity =9.8m/s/s =0.0098mm/ms/ms =0.0098*px/ms/ms

  function initBall() {
    // restart at 1 m/sec initial velocity and at a random angle
    const startAngle = -(90 * Math.random() + 45);  // shoot upward
    // speed m/s = speed mm/ms = speed mm/ms * px/mm = speed * px_mm
    const vel = 1 * px_mm;

    this.nextState.x = 120;  // start position (120, 75)
    this.nextState.y = 75;
    this.nextState.vx = vel * Math.cos(startAngle * Math.PI / 180);
    this.nextState.vy = vel * Math.sin(startAngle * Math.PI / 180);
    // return the object to be animated
    return elem;
  }

  function bouncingPath(time)    // time passed is the time since start of animation
  {
    // 'this' refers to the AnimObj object
    if (time == 0)   // generate random start condition for each reset
    {
      initBall.call(this);
      return;     // this is the state to get drawn at start
    }
    // calculate the new position and velocity
    const timeInt = time - this.currState.time;   // time since last draw
    let yVel = this.currState.vy + gravity * timeInt;    // accelerating due to gravity
    let xVel = this.currState.vx;                    // constant
    let x = this.currState.x + xVel * timeInt;
    let y = this.currState.y + yVel * timeInt + 0.5 * gravity * timeInt * timeInt;
    // now check for hitting the walls
    if (x > rightWall - elementWidth) {
      x = rightWall - elementWidth;
      xVel *= reflect * coeff;    // lossy reflection next step
    }
    if (x < leftWall) {
      x = leftWall;
      xVel *= reflect * coeff;    // lossy reflection next step
    }
    if (y < topWall) {
      y = topWall;
      yVel *= reflect * coeff;    // lossy reflection next step
    }
    if (y > bottomWall - elementHeight) {
      y = bottomWall - elementHeight;
      // calc velocity at the floor   (v^2 = u^2 + 2*g*s)
      let s = bottomWall - elementHeight - this.currState.y;     // pre bounce
      let u = this.currState.vy;
      yVel = Math.sqrt(u * u + 2 * gravity * s);
      yVel *= reflect * coeff;  // lossy reflection next step
      xVel *= friction;
    }
    this.nextState.x = x;
    this.nextState.y = y;
    this.nextState.vx = xVel;
    this.nextState.vy = yVel;
  }

  function moveElem(obj, pos) {
    obj.style.left = pos.x + "px";
    obj.style.top = pos.y + "px";
  }

  const anim = new Animator(initBall, moveElem, bouncingPath);
  bb_tline = new Timeline(anim, 3000, false);
}

window.addEventListener("load", function(){
  // buildMenu(indexData);

  // cm_tline = new Orbit('ball3');
  animDemo('ballBlue');
});