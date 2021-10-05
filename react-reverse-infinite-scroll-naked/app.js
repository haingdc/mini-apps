

class App extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages = async () => {
    let updateMessages = [...this.state.messages];

    var newMessages = await new Promise(function (resolve, reject) {
      setTimeout(function() {
        var now = new Date();
        var result = new Array(10).fill({}).map(() => ({
          id: uuid.v4(),
          message: faker.lorem.text().substr(0, 30),
          timeIndicator: new Date(new Date().setDate(now.getDate() - 1)).toLocaleDateString(),
          isMySelf: Math.random() > 0.1,
        }));
        resolve(result);
      }, 1000);
    });

    updateMessages = [...newMessages, ...updateMessages];
    this.setState({ messages: updateMessages });
  }

  render() {
    return React.createElement
    (
      'div', { className: 'App' },
      React.createElement(ScrollingList, { messages: this.state.messages, fetchMessages: this.fetchMessages })
    )
  }
}

class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.messages.length < this.props.messages.length) {
      var list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  listScrollHandler = (event) => {
    var scrollTop = event.target.scrollTop;
    if (scrollTop == 0) {
      this.props.fetchMessages();
    }
  }

  render() {
    var messages = this.props.messages;
    return React.createElement('div', { ref: this.listRef, onScroll: this.listScrollHandler, className: 'box'},
      messages.map(item => React.createElement(Item, {
        key: item.id,
        isMySelf: item.isMySelf,
        timeIndicator: item.timeIndicator,
        message: item.message
      }))
    );
  }
}

function Item(props) {
  var className = ['message-item', props.isMySelf ? 'self' : 'not-self'].join(' ');
  return React.createElement('div', { className },
    React.createElement('time', null, props.timeIndicator),
    React.createElement('p', null, props.message)
  );
}

ReactDOM.render(
  React.createElement(React.StrictMode, null,
    React.createElement(App)
  ),
  document.querySelector('#fruit-list')
)