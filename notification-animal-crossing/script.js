const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function easeLinear(t, b, c, d) {
  return c * t / d + b;
}

const container = document.querySelector('.container');
let containerColumns = 1;
const containerGap = 10;
const animation_duration = 250;
let selectedFn = easeLinear;
let debug = false; // toggle to on/off debug mode
let t0 = 0;
let t2 = 0;
let dt = 0; // duration debug
const collapse_gap = 5;

const btnShowLess = container.querySelector('.head__btn--less');

function getInitialTransformList(length) {
  const list = new Array(length);
  for (let i = 0; i < list.length; i++) {
    list[i] = [[0, 0], [0, 0]];
  }
  return list;
}

const data = [
  {
    name: 'Ace',
    src: 'NH-Ace_poster_sq.webp',
    content: 'Hi. Sam.'
  },
  {
    name: 'Admiral',
    src: 'NH-Admiral_poster.webp',
    content: 'Ace. Good to meet you'
  },
  {
    name: 'Ace',
    src: 'NH-Ace_poster_sq.webp',
    content: 'Did you just arrive here?'
  },
  {
    name: 'Admiral',
    src: 'NH-Admiral_poster.webp',
    content: 'How do you like it?'
  },
  {
    name: 'Ace',
    src: 'NH-Ace_poster_sq.webp',
    content: `It's exciting! It's much busier than the last city we lived in. I was working in Seattle for the last 3 years`
  },
  {
    name: 'Ace',
    src: 'NH-Ace_poster_sq.webp',
    content: `This weekend’s project: debugging a performance issue where running

    div​.style.transform = 'translateX(100px)'
    
    was triggering a style recalculation for 15K nodes 😨
    
    (Guess why)`
  },
  {
    name: 'Admiral',
    src: 'NH-Admiral_poster.webp',
    content: `The app we'll be building will be a notes app with a login portal that can register users, as well as log in users and reset passwords and logged in users will be able to view, create, update and delete notes. This article will focus more on the Rust (backend) side and will assume that you have knowledge of using React.js/Next.js for your frontend.`
  },
  



  // {
  //   src: 'NH-Agent_S_poster.webp',
  // },
  // {
  //   src: 'NH-Agnes_poster.webp',
  // },
  // {
  //   src: 'NH-Al_poster.webp',
  // },
  // {
  //   src: 'NH-Alfonso_poster.webp',
  // },
  // {
  //   src: 'NH-Alice_poster.webp',
  // },
  // {
  //   src: 'NH-Alli_poster.webp',
  // },
];

const notification = document.querySelector('.notification');

const items = [];
for (var i = 0, zIndex = data.length - 1; i < data.length; i++, zIndex--) {
  const item = data[i];
  const elem_item = document.createElement('div');
  elem_item.className = 'item';
  elem_item.style.zIndex = zIndex;
  const elem_character = document.createElement('div');
  elem_character.className = 'character';
  const elem_avatar = document.createElement('div');
  elem_avatar.className = 'avatar';
  const elem_avatar_img = document.createElement('img');
  elem_avatar_img.src = `./images/${item.src}`;
  elem_avatar.appendChild(elem_avatar_img);
  const elem_header = document.createElement('div');
  elem_header.className = 'header';
  elem_header.innerText = item.name;
  const elem_content = document.createElement('div');
  elem_content.className = 'content';
  elem_content.innerText = item.content;
  elem_character.appendChild(elem_avatar);
  elem_character.appendChild(elem_header);
  elem_character.appendChild(elem_content);
  elem_item.appendChild(elem_character);
  notification.appendChild(elem_item);
  items.push(elem_item);
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyA' && debug) {
    if (t2 < dt) {
      t2 = Math.min(t2 + 1000 / 60);
    }
    requestAnimationFrame(inBetween);
  }
});

function calcExpand() {
  transform_list = getInitialTransformList(items.length);
  // padding_inline_list = getInitialPaddingInlineList(items.length);

  let translateX = 0, translateY = 0;
  let row = 0, col = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    item.classList.remove('collapse');
    item.style.height = '';
    const currentPaddingInline = item.style.paddingInline;
    item.style.paddingInline = '';


    transform_list[i][1] = [translateX, translateY];
    // swap
    var temp = padding_inline_list[i][0];
    padding_inline_list[i][0] = padding_inline_list[i][1];
    padding_inline_list[i][1] = -padding_inline_list[i][1];

    translateX += items[i].offsetWidth + containerGap;
    if (col === containerColumns - 1) {
      col = 0;
      row += 1;
      translateX = 0;
      translateY += items[i].offsetHeight + containerGap;

      item.style.paddingInline = currentPaddingInline;
    } else {
      col += 1;
    }
  }

  return transform_list;
}

function calcCollapse() {
  transform_list = getInitialTransformList(items.length);
  padding_inline_list = getInitialPaddingInlineList(items.length);

  const first = items[0];
  height = first.getBoundingClientRect().height;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    item.style.height = height + 'px';
    item.classList.add('collapse');

    const style = window.getComputedStyle(item);
    const matrix = new WebKitCSSMatrix(style.transform);
    transform_list[i][0] = [matrix.m41, matrix.m42];
    transform_list[i][1] = [-matrix.m41, -matrix.m42 + i * collapse_gap];

    padding_inline_list[i][1] = i * paddingInline;
  }
}

function inBetween(t1) {
  let dt = t1 - t0;
  dt = Math.min(dt, animation_duration);

  if (debug) {
    dt = t2 - t0;
  }

  for (let i = 0; i < transform_list.length; i++) {
    const bx = transform_list[i][0][0];
    const by = transform_list[i][0][1];
    const cx = transform_list[i][1][0];
    const cy = transform_list[i][1][1];
    const x1 = selectedFn(dt, bx, cx, animation_duration);
    const y1 = selectedFn(dt, by, cy, animation_duration);
    const px = padding_inline_list[i][0];
    const py = padding_inline_list[i][1];
    const p = selectedFn(dt, px, py, animation_duration);
    items[i].style.transform = `translate(${x1}px, ${y1}px)`;
    items[i].style.paddingInline = `${p}px`;
  }
  if (dt < animation_duration) {
    requestAnimationFrame(inBetween);
  }
}
const STATES = { EXPAND: 'EXPAND', COLLAPSE: 'COLLAPSE' };

let state = STATES.COLLAPSE;
let height = 0;
let paddingInline = 5;
let transform_list = getInitialTransformList(items.length);
let padding_inline_list = getInitialPaddingInlineList(items.length);

function getInitialPaddingInlineList(length) {
  const list = new Array(length);
  for (let i = 0; i < list.length; i++) {
    list[i] = [0, 0];
  }
  return list;
}

if (state === STATES.COLLAPSE) {
  calcCollapse();
} else {
  calcExpand();
}
t0 = performance.now();
t2 = performance.now() + 1000 / 60;
dt = t0 + animation_duration;
requestAnimationFrame(inBetween);

let myReq;

btnShowLess.addEventListener('click', collapse);
if (items[0]) {
  items[0].addEventListener('click', expand);
}

function collapse() {
  if (state === STATES.COLLAPSE) return;

  if (myReq !== undefined) {
    cancelAnimationFrame(myReq);
  }
  state = STATES.COLLAPSE;
  calcCollapse();
  t0 = performance.now();
  t2 = performance.now() + 1000 / 60;
  dt = t0 + animation_duration;
  myReq = requestAnimationFrame(inBetween);
}

function expand() {
  if (state === STATES.EXPAND) return;
  if (myReq !== undefined) {
    cancelAnimationFrame(myReq);
  }
  state = STATES.EXPAND;
  calcExpand();
  t0 = performance.now();
  t2 = performance.now() + 1000 / 60;
  dt = t0 + animation_duration;
  myReq = requestAnimationFrame(inBetween);
}