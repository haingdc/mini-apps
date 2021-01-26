var requestId = 0;
var animationStartTime = 0;

function animate(time) {
  var frog = document.getElementById("animated");
  frog.style.left = (50 + (time - animationStartTime)/10 % 300) + "px";
  frog.style.top = (185 - 10 * ((time - animationStartTime)/100 % 10) + ((time - animationStartTime)/100 % 10) * ((time - animationStartTime)/100 % 10) ) + "px";
  var t = (time - animationStartTime)/10 % 100;
  frog.style.backgroundPosition = - Math.floor(t / (100/2)) * 60+ "px";
  requestId = window.requestAnimationFrame(animate);
}
function start() {
  animationStartTime = window.performance.now();
  // requestId = window.requestAnimationFrame(animate);
  requestId = window.requestAnimationFrame(goesOn);
}
function stop() {
  if (requestId)
    window.cancelAnimationFrame(requestId);
  requestId = 0;
}

function move(frog, time, top, left, v) {
  frog.style.left = (left + (time - animationStartTime)/10 % 300) + "px";
  frog.style.top = (top - 10 * ((time - animationStartTime)/100 % 10) + ((time - animationStartTime)/100 % 10) * ((time - animationStartTime)/100 % 10) ) + "px";

  var t = (time - animationStartTime)/10 % 100;
  frog.style.backgroundPosition = - Math.floor(t / (v/2)) * 60+ "px";
  console.log(frog.style.backgroundPosition, 'position')
}
var list = [{ top: 185, left: 50, v: 100 }, { top: 300, left: 120, v: 120 }]
function goesOn(time) {
  var frogs = document.querySelectorAll('.animated');
  frogs.forEach((n, index) => {
    move(n, time, list[index].top, list[index].left, list[index].v);
  });
  requestId = window.requestAnimationFrame(goesOn);
}