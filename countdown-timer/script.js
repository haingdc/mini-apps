const newYears = '1 Jan 2021';

function countdown() {
  var newYearsDate = new Date(newYears);
  var currentDate = new Date();

  var seconds = (newYearsDate - currentDate) / 1000;

  var days = Math.floor(seconds / 3600 / 24);

  console.log(days);

  // sec -> min -> hour -> days
  var range = [60, 3600, 3600 * 24];

  // N secs -> ? days
  //           ? hours
  //           ? mins
  //           ? secs
}

setInterval(countdown, 1000)

countdown();