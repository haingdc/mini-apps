var INIT_TIME = new Date().getTime();

/**
 * Constructs a random item with a given id.
 * @param {number} id An identifier for the item.
 * @return {Object} A randomly generated item.
 */
function getItem(id) {
  function pickRandom(a) {
      return a[Math.floor(Math.random() * a.length)];
  }

  return new Promise(function(resolve) {
    var item = {
      id: id,
      avatar: Math.floor(Math.random()*NUM_AVATARS),
      self: Math.random() < 0.1,
      image: Math.random() < 1.0 / 20 ? Math.floor(Math.random()*NUM_IMAGES) : '',
      time: new Date(Math.floor(INIT_TIME + id*20*1000 + Math.random()*20*1000)),
      message: pickRandom(MESSAGES)
    }
    if(item.image === '') {
      resolve(item);
    }
    var image = new Image();
    image.src = 'images/image' + item.image + '.jpg';
    image.addEventListener('load', function() {
      item.image = image;
      resolve(item);
    });
    image.addEventListener('error', function() {
      item.image = '';
      resolve(item);
    });
  });
}

function ContentSource() {
  // Collect template nodes to be cloned when needed.
  this.tombstone_ = document.querySelector("#templates > .chat-item.tombstone");
  this.messageTemplate_ = document.querySelector("#templates > .chat-item:not(.tombstone)");
  this.nextItem_ = 0;
}

ContentSource.prototype = {
  fetch: function(count) {
    // Fetch at least 30 or count more objects for display.
    count = Math.max(30, count);
    return new Promise(function(resolve, reject) {
      // Assume 50 ms per item.
      setTimeout(function() {
        var items = [];
        for (var i = 0; i < Math.abs(count); i++) {
          items[i] = getItem(this.nextItem_++);
        }
        resolve(Promise.all(items));
      }.bind(this), 1000 /* Simulated 1 second round trip time */ );
    }.bind(this));
  },

  createTombstone: function() {
    return this.tombstone_.cloneNode(true);
  },

  render: function(item, div) {
    // TODO: Different style?
    div = div || this.messageTemplate_.cloneNode(true);
    div.dataset.id = item.id;
    div.querySelector('.avatar').src = 'images/avatar' + item.avatar + '.jpg';
    div.querySelector('.bubble p').textContent = item.message;
    div.querySelector('.bubble .posted-date').textContent = item.time.toString();

    var img = div.querySelector('.bubble img');
    if(item.image !== '') {
      img.classList.remove('invisible');
      img.src = item.image.src;
      img.width = item.image.width;
      img.height = item.image.height;
    } else {
      img.src = '';
      img.classList.add('invisible');
    }

    if(item.self) {
      div.classList.add('from-me');
    } else {
      div.classList.remove('from-me');
    }
    return div;
  },

};

function numDomNodes(node) {
  if(!node.children || node.children.length == 0)
    return 0;
  var childrenCount = Array.from(node.children).map(numDomNodes);
  return node.children.length + childrenCount.reduce(function(p, c){ return p + c; }, 0);
}

document.addEventListener('DOMContentLoaded', function() {
  window.scroller =
    new InfiniteScroller(
      document.querySelector('#chat-timeline'),
      new ContentSource()
    );

  var stats = new Stats();
  var domPanel = new Stats.Panel('DOM Nodes', '#0ff', '#002');
  stats.addPanel(domPanel);
  stats.showPanel(3);
  document.body.appendChild(stats.dom);
  var TIMEOUT = 100;
  setTimeout(function timeoutFunc() {
    // Only update DOM node graph when we have time to spare to call
    // numDomNodes(), which is a fairly expensive function.
    requestIdleCallback(function() {
      domPanel.update(numDomNodes(document.body), 1500);
      setTimeout(timeoutFunc, TIMEOUT);
    });
  }, TIMEOUT);


});