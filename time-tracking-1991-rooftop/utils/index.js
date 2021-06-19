var {createElement: e} = React

function calculateTop(hours, minutes, /* height of an hour cell */h = 96) {
  return hours * h + minutes * h / 60;
}

function calculateHeight(/* in minutes [0, 60] */duration, /* height of an hour cell */h = 96) {
  return duration * h / 60;
}

var layout = {
	calculateTop,
	calculateHeight,
}

export {
	e,
	layout,
}