var {createElement: e} = React

function calculateTop(hours, minutes, /* height of an hour cell */h = 96) {
  return hours * h + minutes * h / 60;
}

function addExtraTop(/* extra top */startFrom) {
	return function sum(top) {
		return startFrom + top
	}
}


function getTop(hours, minutes, /* height of an hour cell */h = 96, startFrom = -h / 2) {
	var getToTal = R.pipe( calculateTop, addExtraTop(startFrom) )
	return getToTal(hours, minutes, h)
}

function getHeight(/* in minutes [0, 60] */duration, /* height of an hour cell */h = 96) {
  return duration * h / 60;
}

function minimum2Digits(num) {
	return num.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
}

function toMoment(year = 2021, month = 1, day = 1, hour = 0, minutes = 0) {
	var params = [year, month, day, hour, minutes]
	var format = R.pipe(
		R.map(minimum2Digits),
		([yearStr, monthStr, dayStr, hourStr, minutesStr]) => moment(`${monthStr}/${dayStr}/${yearStr} ${hourStr}:${minutesStr}`, 'MM/DD/YYYY hh:mm')
	)
	return format(params)
}

function getEvent() {
	function pickRandom(a) {
		return a[Math.floor(Math.random() * a.length)];
	}

	return new Promise(function(resolve) {
		var startTime = toMoment(/* year */ undefined, /* month */ undefined, /* day */ undefined, /* hour */ pickRandom(HOURS), /* minutes */ MINUTES)
		var duration = pickRandom([1])  // hardcode: duration in an hour
		var endTime = startTime.clone().add(duration, 'hours')
		var item = {
			id       : uuid.v4(),
			title    : pickRandom(NOTES),
			startTime: startTime,
			endTime  : endTime,
			color    : pickRandom(COLORS),
			day      : pickRandom(DAY_NAMES),
			top      : getTop(/* hours */startTime.hours(), /* minutes */ startTime.minutes()),
			height   : getHeight(/* duration */ 60)
		};
		resolve(item);
	});
}

var layout = {
	getTop,
	getHeight,
}

export {
	e,
	layout,
	toMoment,
	getEvent,
}