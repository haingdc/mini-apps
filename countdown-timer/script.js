const newYears = '1 Jan 2021';

var isNotNaN = R.complement( Number.isNaN );

var daysEl = document.getElementById('days');
var hoursEl = document.getElementById('hours');
var minsEl = document.getElementById('mins');
var secondsEl = document.getElementById('seconds');

// N miliseconds -> ? days
//                  ? hours
//                  ? mins
//                  ? secs
function getRemainData(milliseconds) {
  var constants = [
    { unit: 'second', convert: 1000             , remain: 60  },
    { unit: 'minute', convert: 60 * 1000        , remain: 60  },
    { unit: 'hour'  , convert: 60 * 60 * 1000   , remain: 24  },
    { unit: 'day'   , convert: 24 * 3600 * 1000 , remain: NaN },
  ];

  var getRemain = ({ name, convert, remain }) => R.pipe(
    R.divide(milliseconds),
    Math.floor,
    R.when( R.curryN(2, isNotNaN )(remain), R.modulo( R.__, remain ) )
  )( convert );

  var [seconds, mins, hours, days] = R.map( getRemain, constants );

  return [seconds, mins, hours, days];
}

// SIDE EFFECTS!!
function updateUI(seconds, mins, hours, days) {
  daysEl.innerHTML = days;
  hoursEl.innerHTML = formatTime( hours );
  minsEl.innerHTML = formatTime(mins);
  secondsEl.innerHTML = formatTime(seconds);
}

function countDown() {
  var newYearsDate = new Date(newYears);
  var currentDate  = new Date();
  var milliseconds = newYearsDate - currentDate;
  R.pipe(
    getRemainData,
    R.apply( updateUI )
  )( milliseconds );

}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// countdown();
setInterval(countDown, 1000)