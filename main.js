// class weekSchedule {
//   constructor{
// this.day = {}
//   }
// }

var schedule = {
  Sunday: {
    day: 'Sunday',
    todo: []
  },
  Monday: {
    day: 'Monday',
    todo: []


  },
  Tuesday: {
    day: 'Tuesday',
    todo: []


  },
  Wednesday: {
    day: 'Wednesday',
    todo: []


  },
  Thursday: {
    day: 'Thursday',
    todo: []


  },
  Friday: {
    day: 'Friday',
    todo: []


  },
  Saturday: {
    day: 'Saturday',
    todo: []


  }
};



var days = document.querySelector('.days');

function selectedDay() {
  if (event.target.className === days.className) {
    return;
  } else {

