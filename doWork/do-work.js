function a() {
  b();
}
function b() {
  c();
  h();
}

function c() {
  d();
  f();
}

function d() {
  e();
}

function e() {
  for (let i = 0; i < 1e7; i += Math.random()) { }
}
function f() {
  for (let i = 0; i < 1e7; i += Math.random()) { }
  g();
}
function g() {
  for (let i = 0; i < 1e7; i += Math.random()) { }
}
function h() {
  f();
}

a();

document.getElementById('title').addEventListener('click', function handleClickTitle(event) {
  console.log('event', event)
})