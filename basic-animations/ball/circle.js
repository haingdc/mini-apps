var cm_tline = null;

function Orbit(objId)
{
  const elem = document.getElementById(objId),
        radius = 80,
        va = 3,             // angular velocity, 3 radians / sec
        cx = 120,           // coordinates of orbit center
        cy = 120;
  let savTime = 0,       // time when last frame was drawn
      ang = 0,
      playing = false;

  function circularPath(){
    let currTime = Date.now(),
        diff = currTime - savTime;      // time since last frame

    ang += va * diff / 1000;                // angle moved at constant angular velocity
    if (ang > 2 * Math.PI) {              // wraparound for angle
      ang -= 2 * Math.PI;
    }
    const x = cx + radius * Math.cos(ang);  // calculate coords of ball
    const y = cy + radius * Math.sin(ang);
    // elem.style.left = x + "px";       // move the element
    // elem.style.top = y + "px";
    elem.style.transform = `translate(${x}px, ${y}px)`;

    savTime = currTime;               // save the time this frame is drawn
    if (playing){
      requestAnimationFrame(circularPath);
    }
  }

  this.play = function(){
    playing = true;
    savTime = Date.now();             // reset to avoid a jump in angle
    requestAnimationFrame(circularPath);
  };

  this.pause = function(){
    playing = false;                  // stop after next frame
  };
}

cm_tline = new Orbit('ball');