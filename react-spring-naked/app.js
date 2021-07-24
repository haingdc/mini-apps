// var NUM_TRANS = [
//   {
//     "id": "7f515601-675a-4fdc-995a-796f41421383",
//     "name": 0
//   },
//   {
//     "id": "39538eec-8be1-4d59-b199-81148a8dd804",
//     "name": 1
//   },
//   {
//     "id": "9540c6a3-9603-4da3-a19d-7fac5a3ef754",
//     "name": 2
//   },
//   {
//     "id": "dd1d70c5-88f9-4cf0-88e9-303b14be9db6",
//     "name": 3
//   },
//   {
//     "id": "5e681121-64ba-4601-9306-e49c24999a13",
//     "name": 4
//   },
//   {
//     "id": "fdc1e40d-b0a2-469c-b9a8-c756c5a824ed",
//     "name": 5
//   },
//   {
//     "id": "edaa8f2e-e030-40fd-8565-caeed2e3c59e",
//     "name": 6
//   },
//   {
//     "id": "90827fe1-f332-48e2-95a8-432c66765de6",
//     "name": 7
//   },
//   {
//     "id": "c58638e9-b6e6-4b7c-83a6-5ee784361245",
//     "name": 8
//   },
//   {
//     "id": "e5f4d1fa-4a3b-49e9-90b8-f07653bc855d",
//     "name": 9
//   },
//   {
//     "id": "4790f4c8-178c-49f0-8412-a3696de5a40c",
//     "name": 10
//   },
//   {
//     "id": "c8cbc692-36fc-4e17-a67c-a44bdc9b2b5a",
//     "name": 11
//   },
//   {
//     "id": "b38d6dc6-c9b5-48df-9ed8-daedebbc96dd",
//     "name": 12
//   },
//   {
//     "id": "16be06a4-f3b5-497f-ba72-5af33c483131",
//     "name": 13
//   },
//   {
//     "id": "3ccc942f-a068-46c0-b744-38cc99209f10",
//     "name": 14
//   },
//   {
//     "id": "6c59cca9-c2fe-40c5-be24-1c928fdb30e3",
//     "name": 15
//   },
//   {
//     "id": "4b0bec11-725b-49a1-b1ec-89aacd13bd31",
//     "name": 16
//   },
//   {
//     "id": "f2cda86f-c4c8-44e7-a72e-cda071fe9394",
//     "name": 17
//   },
//   {
//     "id": "fea4ee8c-e170-40be-a9b3-2194d1df8b8b",
//     "name": 18
//   },
//   {
//     "id": "0ed9e43b-f566-4754-8cf1-4ea19656e01c",
//     "name": 19
//   }
// ];

var NUM_TRANS = [
  {
    "fig": 1,
    "op": {
      "range": [
        0.75,
        1
      ],
      "output": [
        0,
        1
      ]
    },
    "trans": {
      "range": [
        0.75,
        1
      ],
      "output": [
        -40,
        0
      ],
      "extrapolate": "clamp"
    }
  },
  {
    "fig": 2,
    "op": {
      "range": [
        0.25,
        0.5
      ],
      "output": [
        0,
        1
      ]
    },
    "trans": {
      "range": [
        0.25,
        0.5
      ],
      "output": [
        -40,
        0
      ],
      "extrapolate": "clamp"
    }
  },
  {
    "fig": 3,
    "op": {
      "range": [
        0,
        0.25
      ],
      "output": [
        0,
        1
      ]
    },
    "trans": {
      "range": [
        0,
        0.25
      ],
      "output": [
        -40,
        0
      ],
      "extrapolate": "clamp"
    }
  },
  {
    "fig": 4,
    "op": {
      "range": [
        0.5,
        0.75
      ],
      "output": [
        0,
        1
      ]
    },
    "trans": {
      "range": [
        0.5,
        0.75
      ],
      "output": [
        -40,
        0
      ],
      "extrapolate": "clamp"
    }
  }
];
function App() {
  var [items, setItems] = React.useState(NUM_TRANS)
  var transitions = ReactSpring.useTransition(items, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 200,
    config: ReactSpring.config.molasses,
    onRest: () => setItems([]),
  });

  React.useEffect(function reset() {
    if (items.length == 0) {
      setTimeout(() => {
        setItems(NUM_TRANS)
      }, 2000);
    }
  }, [items]);

  return React.createElement('div',
    {
      style: {
        display: 'flex',
      },
    },
    transitions(function animate(ref, item) {
      var { opacity } = ref;
      return React.createElement(ReactSpring.animated.div,
        {
          style: {
            opacity: opacity.to(item.op),
            transform: opacity
              .to(item.trans)
              .to(function(y) {
                return `translate3d(0,${y}px,0)`;
              }),
          },
        },
        item.fig
      )
    })
  )
}
ReactDOM.render(
  React.createElement(App),
  document.querySelector('#fruit-list')
)