var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var increaseBtn = document.getElementById('increase');
var decreaseBtn = document.getElementById('decrease');
var colorEl = document.getElementById('color');
var sizeEl = document.getElementById('size');
var clearEl = document.getElementById('clear');
var isPressed = false;
var color = colorEl.value || 'black';

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    var x2 = e.offsetX;
    var y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

canvas.addEventListener('mousedown', function(e) {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener('mouseup', function(e) {
  isPressed = false;
  x = undefined;
  y = undefined;
});

var size = 30;
var x;
var y;


function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

increaseBtn.addEventListener('click', function() {
  size += 5;
  if (size > 50) {
    size = 50;
  }
  updateSizeOnScreen();
});
decreaseBtn.addEventListener('click', function() {
  size -= 5;
  if (size < 5) {
    size = 5;
  }
  updateSizeOnScreen();
});

function updateSizeOnScreen() {
  sizeEl.innerText = size;
}

colorEl.addEventListener('change', function changeColor(e) {
  color = e.target.value;
});

function drawLine(x1,y1,x2,y2) {
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.lineWidth = size
  ctx.strokeStyle = color;
  ctx.stroke();
}

clearEl.addEventListener('click', function clear() {
  ctx.clearRect(0,0, canvas.width, canvas.clientHeight);
});