const newYears = '1 Jan 2021';

var isNotNaN = R.complement( Number.isNaN );
// N miliseconds -> ? days
//                  ? hours
//                  ? mins
//                  ? secs
function countdown() {
  var newYearsDate = new Date(newYears);
  var currentDate  = new Date();
  var milliseconds = newYearsDate - currentDate;

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

  var [days, hours, mins, seconds] = R.map( getRemain, constants );
  console.log(days, hours, mins, seconds);
}

// countdown();
setInterval(countdown, 1000)