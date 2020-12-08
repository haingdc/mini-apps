function start() {
  startBall2();
}

function reset() {
  var ballObj = document.getElementById("ball");
  ballObj.style.left = "50px";
  ballObj.style.top = "30px";
}

function moveDomObj(id, left, top) {
  var domObj = document.getElementById(id);
  domObj.style.left = left + 'px';
  domObj.style.top  = top  + 'px';
}

var timer2 = undefined;
var s = 0;

function stepBall2() {
  var x = 50 + 4 * s;
  var y = 30 + 1.6 * s * s; // a parabolic path y=x*x
  console.log({x,y})
  moveDomObj('ball', x, y);
  s++;
  if (s < 14) {
    timer2 = setTimeout(stepBall2, 50);
  } else {
    s = 0;
  }
}

function startBall2() {
  timer2 = setTimeout(stepBall2, 100);
}