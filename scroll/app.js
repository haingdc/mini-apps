
var dom = Bloop.dom;

// components

var App = Bloop.createClass({
  getInitialState: function() {
		window['todo'] = this;
    return { pageY: 0,
             pageHeight: window.innerHeight };
  },

  componentDidRender: function() {
    var numItems = this.props.items.length;
    document.querySelector('.list').style.height = numItems * 31 + 'px';
    var ul = document.querySelector('ul');
    ul.style.top = this.state.pageY + 'px';
  },

  render: function() {
    var pageY = this.state.pageY;
    var begin = pageY / 31 | 0;
    // Add 2 so that the top and bottom of the page are filled with
    // next/prev item, not just whitespace if item not in full view
    var end = begin + (this.state.pageHeight / 31 | 0 + 2);

    var offset = pageY % 31;
    
    return dom.div(
      { className: 'list',
        style: 'position: relative; top: ' + (-offset) + 'px' },
      dom.ul(
        this.props.items.slice(begin, end).map(function(item) {
          return dom.li(null, item.title);
        })
      )
    );
  }
});

// application code

var items = [];
for(var i=0; i<5000; i++) {
  items.push({
    title: 'Foo Bar ' + i
  });
}

var app = App({ items: items });

window.addEventListener('scroll', function(e) {
  app.state.pageY = Math.max(e.pageY || window.pageYOffset, 0);
  app.state.pageHeight = window.innerHeight;
});

// render

function render() {
  Bloop.renderComponent(app, document.body);
  requestAnimationFrame(render);
}

render();
