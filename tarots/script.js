/**
 * 
 * @param {number} t Time - amount of time that has passed since the beginning of the animation
 * @param {number} b Beginning value - The starting point of the animation. Usually it's a static value, you can start at 0 for example.
 * @param {number} c Change in value - The amount of change needed to go from starting point to end point. It's also usually a static value.
 * @param {number} d Duration - Amount of time the animation will take. Usually a static value aswell.
 * @returns 
 */
function easeLinear(t, b, c, d) {
  return c * t / d + b;
}

function easeInQuad (t, b, c, d) {
  return c * (t /= d) * t + b;
}

function easeOutQuad (t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
}

function easeInOutQuad (t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

function easeInSine (t, b, c, d) {
  return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}

function easeOutSine (t, b, c, d) {
  return c * Math.sin(t / d * (Math.PI / 2)) + b;
}

function easeInOutSine (t, b, c, d) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}

function easeInExpo (t, b, c, d) {
  return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}

function easeOutExpo (t, b, c, d) {
  return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}

function easeInOutExpo (t, b, c, d) {
  if (t == 0) return b;
  if (t == d) return b + c;
  if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
  return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}

function easeInCirc (t, b, c, d) {
  return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}

function easeOutCirc (t, b, c, d) {
  return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}

function easeInOutCirc (t, b, c, d) {
  if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
  return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}

function easeInCubic (t, b, c, d) {
  return c * (t /= d) * t * t + b;
}

function easeOutCubic (t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

function easeInOutCubic (t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t + 2) + b;
}

function easeInQuart (t, b, c, d) {
  return c * (t /= d) * t * t * t + b;
}

function easeOutQuart (t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

function easeInOutQuart (t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

function easeInQuint (t, b, c, d) {
  return c * (t /= d) * t * t * t * t + b;
}

// https://spicyyoghurt.com/tools/easing-functions
const easeFns = {
  1: easeLinear,
  2: easeInQuad,
  3: easeOutQuad,
  4: easeInOutQuad,
  5: easeInSine,
  6: easeOutSine,
  7: easeInOutSine,
  8: easeInExpo,
  9: easeOutExpo,
  10: easeInOutExpo,
  11: easeInCirc,
  12: easeOutCirc,
  13: easeInOutCirc,
  14: easeInCubic,
  15: easeOutCubic,
  16: easeInOutCubic,
  17: easeInQuart,
  18: easeOutQuart,
  19: easeInOutQuart,
  20: easeInQuint,
};

// Initialization
const images = [
  'RWS_Tarot_02_High_Priestess.jpg',
  'RWS_Tarot_00_Fool.jpg',
  'RWS_Tarot_01_Magician.jpg',
  'RWS_Tarot_03_Empress.jpg',
  'RWS_Tarot_04_Emperor.jpg',
  'RWS_Tarot_05_Hierophant.jpg',
  'RWS_Tarot_16_Tower.jpg',
  'TheLovers.jpg',
];
const animation_duration = 500;
const containerPadding = 10;
const containerGap = 10;
let itemWidth = 0;
let containerColumns = 0;
let selectedFn = easeLinear;
let debug = false; // toggle to on/off debug mode
let t0 = 0;
let t2 = 0;
let dt = 0; // duration debug

const btnBackList = document.querySelector('.back-list');
const container = document.getElementById('container');
{
  container.style.position = 'relative';
  container.style.padding = containerPadding + 'px';
}

const anchor = document.createElement('div');
{
  anchor.style.width = '1px';
  anchor.style.height = '1px';
  container.appendChild(anchor);
}

// === create tarot elements which are children of the container element
images.forEach(i => {
  const div = document.createElement('div');
  div.className = 'tarot';
  div.style.position = 'absolute';
  const img = document.createElement('img');
  img.src = './images/' + i;
  div.appendChild(img);
  container.appendChild(div);

  div.style.width = '80%';
});

const tarots = document.querySelectorAll('.tarot');
const selectColumns = document.getElementById('select-columns');
containerColumns = selectColumns.value;
const selectFns = document.getElementById('select-functions');
selectedFn = easeFns[selectFns.value];

// === initialize transform_list
let transform_list = getInitialTransformList();

function getInitialTransformList() {
  const list = new Array(tarots.length);
  for (let i = 0; i < list.length; i++) {
    list[i] = [[0, 0], [0, 0]];
  }
  return list;
}

function calcDestinationPos() {
  itemWidth = (container.offsetWidth - (containerColumns - 1) * containerGap - containerPadding * 2) / containerColumns

  for (let i = 0; i < tarots.length; i++) {
    const item = tarots[i];
    item.style.width = itemWidth + 'px';
    item.style.transform = null;
    container.append(item);
  }

  let translateX = 0, translateY = 0;
  let row = 0, col = 0;
  for (let i = 0; i < tarots.length; i++) {
    transform_list[i][1] = [translateX, translateY];
    translateX += tarots[i].offsetWidth + containerGap;
    if (col === containerColumns - 1) {
      col = 0;
      row += 1;
      translateX = 0;
      translateY += tarots[i].offsetHeight + containerGap;
    } else {
      col += 1;
    }
  }
  return transform_list;
}

function inBetween(t1) {
  let end_items = 0;
  let dt = t1 - t0;
  if (debug) {
    dt = t2 - t0;
  }
  console.log('inspect.inBetween', dt);
  for (let i = 0; i < transform_list.length; i++) {
    const bx = transform_list[i][0][0];
    const by = transform_list[i][0][1];
    const cx = transform_list[i][1][0];
    const cy = transform_list[i][1][1];
    const x1 = Math.min(selectedFn(dt, bx, cx, animation_duration), cx);
    const y1 = Math.min(selectedFn(dt, by, cy, animation_duration), cy);
    tarots[i].style.transform = `translate(${x1}px, ${y1}px)`;
    transform_list[i] = [ [x1, y1], transform_list[i][1] ] ;
    if (x1 === cx && y1 === cy) {
      end_items += 1;
    }
  }

  if (debug) return;

  // === stop loop
  if (end_items === transform_list.length - 1) {
    end_items = 0;
  } else if (end_items < transform_list.length - 1) {
    requestAnimationFrame(inBetween);
  }
}




selectColumns.addEventListener('change', () => {
  containerColumns = Number.parseInt(selectColumns.value);
  transform_list = getInitialTransformList();
  calcDestinationPos();
  t0 = performance.now();
  t2 = performance.now() + 1000 / 60;
  dt = t0 + animation_duration;
  requestAnimationFrame(inBetween);
});

selectFns.addEventListener('change', () => {
  selectedFn = easeFns[selectFns.value];
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyA' && debug) {
    if (t2 < dt) {
      t2 = Math.min(t2 + 1000 / 60);
    }
    requestAnimationFrame(inBetween);
  }
});

function scheduleRender() {
}

