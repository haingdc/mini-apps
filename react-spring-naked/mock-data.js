var NUM_TRANS = [
  {
    id: undefined,
    fig: 0,
    op: {
      range: [0.75, 1],
      output: [0, 1]
    },
    trans: {
      range: [0.75, 1],
      output: [40, 0],
      extrapolate: "clamp"
    }
  },
  {
    id: undefined,
    fig: 1,
    op: {
      range: [ 0.25, 0.5 ],
      output: [ 0, 1 ]
    },
    trans: {
      range: [ 0.25, 0.5 ],
      output: [ 40, 0 ],
      extrapolate: "clamp"
    }
  },
  {
    id: undefined,
    fig: 2,
    op: {
      range: [ 0, 0.25 ],
      output: [ 0, 1 ]
    },
    trans: {
      range: [ 0, 0.25 ],
      output: [ 40, 0 ],
      extrapolate: "clamp"
    }
  },
  {
    id: undefined,
    fig: 3,
    op: {
      range: [ 0.5, 0.75 ],
      output: [ 0, 1 ]
    },
    trans: {
      range: [ 0.5, 0.75 ],
      output: [ 40, 0 ],
      extrapolate: "clamp"
    }
  }
];