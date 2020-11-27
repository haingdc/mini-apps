var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var isPressed = false;

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    console.log(e.pageX - canvas.offsetLeft, e.offsetX);
    var x = e.offsetX;
    var y = e.offsetY;
    drawCircle(x, y);
  }
});

canvas.addEventListener('mousedown', function() {
  isPressed = true;
});

canvas.addEventListener('mouseup', function() {
  isPressed = false;
});

var size = 4;
var x    = 50;
var y    = 50;

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
}

function draw() {
  ctx.clearReact(0, 0, canvas.width, canvas.height);
  drawCircle(x, y);
  requestAnimationFrame(draw)
}
