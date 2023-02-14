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

const btnBackList = document.querySelector('.back-list');
const container = document.getElementById('container');
{
  container.style.position = 'relative';
  container.style.padding = containerPadding + 'px';
}

const list = document.querySelector('.list');

const anchor = document.createElement('div');
{
  anchor.style.width = '1px';
  anchor.style.height = '1px';
  container.appendChild(anchor);
}

// === create tarot elements which are children of the 'list' element
images.forEach(i => {
  const div = document.createElement('div');
  div.className = 'tarot';
  div.style.position = 'absolute';
  const img = document.createElement('img');
  img.src = './images/' + i;
  div.appendChild(img);
  list.appendChild(div);

  div.style.width = '80%';
});

const tarots = document.querySelectorAll('.tarot');
const selectColumns = document.getElementById('select-columns');

function layout() {
  containerColumns = Number.parseInt(selectColumns.value);
  itemWidth = (container.offsetWidth - (containerColumns - 1) * containerGap - containerPadding * 2) / containerColumns

  for (let i = 0; i < tarots.length; i++) {
    const item = tarots[i];
    item.style.width = itemWidth + 'px';
    container.append(item);
  }

  // setTimeout(() => {
  //   let translateY = 0;
  //   let translateX = 0;
  //   let row = 0, col = 0;
  //   for (let i = 0; i < tarots.length; i++) {
  //     tarots[i].style.transform = `translate(${translateX}px, ${translateY}px)`
  //     translateX += tarots[i].offsetWidth + containerGap;
  //     if (col === containerColumns - 1) {
  //       col = 0;
  //       row += 1;
  //       translateX = 0;
  //       translateY += tarots[i].offsetHeight + containerGap;
  //     } else {
  //       col += 1;
  //     }
  //   }
  // }, 100);

  globalThis.transform_list = new Array(tarots.length);
  for (let i = 0; i < transform_list.length; i++) {
    transform_list[i] = [[0, 0], [0, 0]];
  }

  const calcDestinationPos = () => {
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
  };

  let t0 = performance.now();

  const inBetween = () => {
    requestAnimationFrame(function (t1) {
      let end_items = 0;
      const dt = t1 - t0;
      for (let i = 0; i < transform_list.length; i++) {
        const bx = transform_list[i][0][0];
        const by = transform_list[i][0][1];
        const cx = transform_list[i][1][0];
        const cy = transform_list[i][1][1];
        const x1 = Math.min(easeLinear(dt, bx, cx, animation_duration), cx);
        const y1 = Math.min(easeLinear(dt, by, cy, animation_duration), cy);
        tarots[i].style.transform = `translate(${x1}px, ${y1}px)`;
        t0 = t1;
        transform_list[i] = [ [x1, y1], transform_list[i][1] ] ;
        if (x1 === cx && y1 === cy) {
          end_items += 1;
        }
      }
      // === stop loop
      if (end_items === transform_list.length - 1) {
        end_items = 0;
      } else if (end_items < transform_list.length - 1) {
        inBetween();
      }
    });
  };

  setTimeout(calcDestinationPos, 100);
  setTimeout(inBetween, 150);
}

selectColumns.addEventListener('change', () => {
  layout();
});

btnBackList.addEventListener('click', () => {
  for (let i = 0; i < tarots.length; i++) {
    const item = tarots[i];
    item.style.width = null;
    item.style.transform = null;

    list.appendChild(item);
  }
});

layout();